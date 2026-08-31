import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { roleSchema } from "@/features/access/fragments/schemas";
import { useRoleCreate, useRoleEdit } from "@/repositories/roles_repository";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRole } from "@/types";
import { STORAGE_KEYS, deleteFromStorage, getFromStorage } from "@/utils";

import Button from "@/components/Buttons/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/FormControlls/TextInput";
import PermissionInput from "@/components/FormControlls/PermissionInput";



export default function RoleForm() {
    const labelStyleClass = "text-sm capitalize";
    const role = getFromStorage<IRole>(STORAGE_KEYS.ROLE);

    const navigate = useNavigate();
    const { id } = useParams();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(roleSchema),
        defaultValues: {
            name: role?.name ?? "",
            description: role?.description ?? "",
            permissions: role?.permissions?.map((el) => el.id)
        }
    });

    const createMutation = useRoleCreate(
        () => close()
    );

    const updateMutation = useRoleEdit(
        () => close()
    );

    const submit = (data: any) => {
        if(id && role) {
            updateMutation.mutate({
                roleId: role.id,
                data: data 
            });
        } else {
            createMutation.mutate(data);
        }
    }

    const close = () => {
        navigate(-1);
        deleteFromStorage(STORAGE_KEYS.ROLE)
    }

    return (
        <Modal
            title={role ? "Edit Role" : "Create Role"}
            isOpen={true}
            onClose={close}
            size="xl"
        >
            <form onSubmit={handleSubmit(submit)}>
                <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <TextInput 
                            type="text"
                            labelStyle={labelStyleClass}
                            label="Name"
                            hasError={errors.name?.type != undefined}
                            error={errors.name?.message?.toString()}
                            register={register("name")}
                        />

                        <TextInput 
                            type="text"
                            className="lg:col-span-2"
                            labelStyle={labelStyleClass}
                            label="Description"
                            hasError={errors.description?.type != undefined}
                            error={errors.description?.message?.toString()}
                            register={register("description")}
                        />
                    </div>
                    
                    <div className="pb-8">
                        <h4 className="text-sm mb-4">
                            Permissions
                        </h4>

                        <PermissionInput
                            defaultValue={role?.permissions?.map(el => el.id)}
                            onChange={(value) => {
                                setValue("permissions", value)
                            }} 
                        />
                    </div>
                   
                </div>

                <Button
                    type="submit"
                    intent="primary"
                    loading={createMutation.isPending || updateMutation.isPending}
                >
                    Save changes
                </Button>
            </form>
        </Modal>
    )
}
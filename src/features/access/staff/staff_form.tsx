import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { staffSchema } from "@/features/access/fragments/schemas";
import { useStaffCreate, useStaffEdit } from "@/repositories/staff_repository";
import { useRoles } from "@/repositories/roles_repository";
import { yupResolver } from "@hookform/resolvers/yup";
import { IStaff } from "@/types";
import { STORAGE_KEYS, deleteFromStorage, getFromStorage } from "@/utils";

import Button from "@/components/Buttons/Button";
import TextInput from "@/components/FormControlls/TextInput";
import SelectInput from "@/components/FormControlls/SelectInput";
import Modal from "@/components/Modal";



export default function StaffForm() {
    const labelStyleClass = "text-sm capitalize";
    const staff = getFromStorage<IStaff>(STORAGE_KEYS.STAFF);

    const navigate = useNavigate();
    const { id } = useParams();

    const { roles } = useRoles(
        { page: 1, per_page: 100 }
    );

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(staffSchema),
        defaultValues: {
            first_name: staff?.first_name ?? "",
            last_name: staff?.last_name ?? "",
            email: staff?.email ?? "",
            role: staff?.role.id ?? "",
        }
    });

    const createMutation = useStaffCreate(
        () => close()
    );

    const updateMutation = useStaffEdit(
        () => close()
    );

    const submit = (data: any) => {
        if(id && staff) {
            updateMutation.mutate({
                staffId: staff.id,
                data: data 
            });
        } else {
            createMutation.mutate(data);
        }
    }

    const close = () => {
        navigate(-1);
        deleteFromStorage(STORAGE_KEYS.STAFF)
    }

    const getRoles = () => roles?.data.map((el) => ({name: el.name , value: el.id}))

    return (
        <Modal
            title={staff ? "Edit Staff" : "Create Staff"}
            isOpen={true}
            onClose={close}
            size="md"
        >
            <form onSubmit={handleSubmit(submit)}>
                <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <TextInput 
                            type="text"
                            labelStyle={labelStyleClass}
                            label="First Name"
                            hasError={errors.first_name?.type != undefined}
                            error={errors.first_name?.message?.toString()}
                            register={register("first_name")}
                        />

                        <TextInput 
                            type="text"
                            labelStyle={labelStyleClass}
                            label="Last Name"
                            hasError={errors.last_name?.type != undefined}
                            error={errors.last_name?.message?.toString()}
                            register={register("last_name")}
                        />

                        <TextInput 
                            type="email"
                            labelStyle={labelStyleClass}
                            label="Email"
                            hasError={errors.email?.type != undefined}
                            error={errors.email?.message?.toString()}
                            register={register("email")}
                        />

                        {
                            roles &&
                            <SelectInput 
                                labelStyle={labelStyleClass}
                                label="Role"
                                displayName="name"
                                valueName="value"
                                defaultValue={watch("role")}
                                options={getRoles() ?? []}
                                hasError={errors.role?.type != undefined}
                                error={errors.role?.message?.toString()}
                                register={register("role")}
                            />
                        }
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
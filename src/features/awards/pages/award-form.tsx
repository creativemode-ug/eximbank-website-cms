import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Award, AwardSchema, AwardOptions, TAwardSchema } from "@/features/awards/types";
import { useCreateAward, useEditAward } from "@/features/awards/repositories";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { Modal, ModalPanel, ModalHead } from "@/components/PModal";

import Button from "@/components/Buttons/Button";
import LocaleSwitch from "@/components/locale-switch";
import SwitchInput from "@/components/FormControlls/SwitchInput";
import TextInput from "@/components/FormControlls/TextInput";
import TextareaInput from "@/components/FormControlls/TextareaInput";



export default function AwardForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const award = location.state as Award | null;

    const { paramState } = useSearchParamState<AwardOptions>();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(AwardSchema),
    });

    const createMutation = useCreateAward(
        () => handleClose()
    );

    const updateMutation = useEditAward(
        () => handleClose()
    );

    const submit = (data: TAwardSchema) => {
        if(award) {
            updateMutation.mutate({
                awardId: award.id,
                data: data as Award
            });
        } else {
            createMutation.mutate(data as Award);
        }
    }

    const handleClose = () => navigate("/awards");
    
    useEffect(() => {
        setValue("locale", paramState.locale!)
    }, [paramState])

    useEffect(() => {
        if(award) {
            setValue("name", award.name)
            setValue("year", award.year)
            setValue("description", award.description)
            setValue("is_published", award.is_published)
        }
    }, [award])

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-2xl">
                <ModalHead 
                    title={`${award ? 'Edit' : 'Create'} Award`}
                    onClose={handleClose}
                >
                    <LocaleSwitch />
                </ModalHead>

                <div className="p-8">
                    <form onSubmit={handleSubmit(submit)}>
                        {paramState.locale}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-8 mb-8">
                            <TextInput 
                                label="Name"
                                error={errors.name?.message?.toString()}
                                register={register("name")}
                                required
                            />

                            <TextInput 
                                label="Year"
                                type="number" 
                                min="2000" 
                                max={new Date().getFullYear()} 
                                step="1"
                                placeholder="e.g. 2022"
                                error={errors.year?.message?.toString()}
                                register={register("year")}
                                required
                            />

                            <TextareaInput
                                className="md:col-span-2"
                                label="Description"
                                hint="max 100 characters"
                                rows={2}
                                error={errors.description?.message?.toString()}
                                register={register("description")}
                                required
                            />

                            <SwitchInput 
                                value={watch("is_published", 0) == 1 ? true : false }
                                text="Publish"
                                onChange={(value) => setValue("is_published", value ? 1 : 0)}
                            />
                        </div>

                        <Button
                            type="submit"
                            intent="primary"
                            loading={createMutation.isPending || updateMutation.isPending}
                        >
                            Save changes
                        </Button>
                    </form>
                </div>
            </ModalPanel>
        </Modal>
    )
}
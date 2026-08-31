import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateSchema, EditSchema, MemberOptions, MemberType } from "@/features/members/types";
import { useCreateMember, useEditMember, useGetMemberDetail } from "@/features/members/repositories";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, ModalPanel, ModalHead } from "@/components/PModal";

import Button from "@/components/Buttons/Button";
import SwitchInput from "@/components/FormControlls/SwitchInput";
import TextInput from "@/components/FormControlls/TextInput";
import SelectInput from "@/components/FormControlls/SelectInput";
import FileInput from "@/components/FormControlls/FileInput";
import TextareaInput from "@/components/FormControlls/TextareaInput";
import LocaleSwitch from "@/components/locale-switch";
import Loader from "@/components/loading-indicator";



export default function MemberForm() {
    const navigate = useNavigate();

    const { paramState } = useSearchParamState<MemberOptions>();
    const { memberId } = useParams();

    const { member, isLoading } = useGetMemberDetail({
        memberId: memberId,
        locale: paramState.locale
    });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(member ? EditSchema : CreateSchema),
    });

    const createMutation = useCreateMember(
        () => handleClose()
    );

    const updateMutation = useEditMember(
        () => handleClose()
    );

    const submit = (data: Record<string, any>) => {
        const formData = new FormData();

        if(data.image) {
            formData.append("image", data.image[0]);
        }
    
        formData.append("full_name", data.full_name);
        formData.append("position", data.position);
        formData.append("quote", data.quote);
        formData.append("type", data.type);
        formData.append("rank", data.rank);
        formData.append("is_published", data.is_published);
        formData.append("locale", paramState.locale ?? "en");

        formData.append("facebook", data.facebook);
        formData.append("linkedin", data.linkedin);
        formData.append("twitter", data.twitter);

        if(member) {
            updateMutation.mutate({
                memberId: member.data.id,
                data: formData 
            });
        } else {
            createMutation.mutate(formData);
        }

    }

    const getMemberTypes = () => {
        return MemberType.map((i) => ({ 
            name: i.toLocaleUpperCase(), 
            value: i.toLowerCase() 
        }))
    }

    const handleClose = () => navigate("/members")

    useEffect(() => {
        if(member) {
            setValue("full_name", member.data.full_name)
            setValue("position", member.data.position)
            setValue("quote", member.data.quote)
            setValue("type", member.data.type)
            setValue("rank", member.data.rank)
            setValue("is_published", member.data.is_published)
            setValue("facebook", member.data.facebook)
            setValue("linkedin", member.data.linkedin)
            setValue("twitter", member.data.twitter)
        }
        }, [member])

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-2xl">
                <ModalHead 
                    title={`${member ? 'Edit' : 'Create'} Member`}
                    onClose={handleClose}
                >
                    <LocaleSwitch />
                </ModalHead>

                <Loader loading={isLoading} />

                {
                    !isLoading && (
                        <div className="p-8">
                            <form onSubmit={handleSubmit(submit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-8 mb-8">

                                    <FileInput 
                                        className="md:col-span-2"
                                        label="Cover image"
                                        placeholder="Upload image files here"
                                        formats="JPG, JPEG, PNG, WEBP, GIF"
                                        hasError={errors.image?.type != null}
                                        error={errors.image?.message?.toString()}
                                        onChange={(value) => setValue("image", value)}
                                        required
                                    />

                                    <TextInput 
                                        label="Full Name"
                                        placeholder="e.g. Andrew Lyimo"
                                        error={errors.full_name?.message?.toString()}
                                        register={register("full_name")}
                                        required
                                    />

                                    <TextInput 
                                        label="Position"
                                        placeholder="e.g. Head - Retail Banking"
                                        hasError={errors.position?.type != undefined}
                                        error={errors.position?.message?.toString()}
                                        register={register("position")}
                                        required
                                    />

                                    <TextareaInput 
                                        className="md:col-span-2"
                                        label="Quote"
                                        hint="max 200 characters"
                                        error={errors.quote?.message?.toString()}
                                        register={register("quote")}
                                    />

                                    <SelectInput 
                                        label="Type"
                                        displayName="name"
                                        valueName="value"
                                        defaultValue={watch("type")}
                                        options={getMemberTypes()}
                                        error={errors.type?.message?.toString()}
                                        register={register("type")}
                                        required
                                    />

                                    <TextInput 
                                        type="number"
                                        min={0}
                                        max={100}
                                        label="Rank"
                                        error={errors.rank?.message?.toString()}
                                        register={register("rank")}
                                        required
                                    />

                                    <TextInput 
                                        label="Linkedin"
                                        error={errors.linkedin?.message?.toString()}
                                        register={register("linkedin")}
                                    />

                                    <TextInput 
                                        label="Twitter"
                                        error={errors.twitter?.message?.toString()}
                                        register={register("twitter")}
                                    />

                                    <TextInput 
                                        label="Facebook"
                                        error={errors.facebook?.message?.toString()}
                                        register={register("facebook")}
                                    />

                                    <div></div>

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
                    )
                }
            </ModalPanel>
        </Modal>
    )
}
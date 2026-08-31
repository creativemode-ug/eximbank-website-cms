import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
import { 
    useCreateDocument, 
    useEditDocument, 
} from "@/features/forms-and-guide/repositories";
import { Document, DocumentType, CreateDocumentSchema, EditDocumentSchema } from "@/features/forms-and-guide/types";
import { Modal, ModalPanel, ModalHead } from "@/components/PModal";
import { i18n } from "@/i18n.config";

import Button from "@/components/Buttons/Button";
import SwitchInput from "@/components/FormControlls/SwitchInput";
import TextInput from "@/components/FormControlls/TextInput";
import FileInput from "@/components/FormControlls/FileInput";
import SelectInput from "@/components/FormControlls/SelectInput";
import useRouteModal from "@/hooks/useRouterModal";




export default function DocumentForm() {
    const location = useLocation();
    const document = location.state as Document | undefined;
    
    const {open, closeModal} = useRouteModal();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(document ? EditDocumentSchema : CreateDocumentSchema),
        defaultValues: document != undefined ? {
            title: document.title,
            type: document.type,
            is_published: document.is_published,
            is_featured: document.is_featured
        } : undefined
    });

    const createMutation = useCreateDocument(closeModal)

    const updateMutation = useEditDocument(closeModal)

    const submit = (data: Record<string, any>) => {
        const formData = new FormData();

        if(data.attachment) {
            formData.append("attachment", data.attachment[0]);
        }

        if(data.cover) {
            formData.append("cover_image", data.cover[0]);
        }
    
        formData.append("title", data.title);
        formData.append("type", data.type.toLocaleLowerCase());
        formData.append("is_published", data.is_published);
        formData.append("featured", data.featured);
        formData.append("locale", i18n.defaultLocale);

        if(document) {
            updateMutation.mutate({
                documentId: document.id,
                data: formData 
            });
        } else {
            createMutation.mutate(formData);
        }

    }

    const getDocumentType = () => {
        return DocumentType.map((i) => ({ name: i.toLocaleUpperCase(), value: i }))
    }

    return (
        <Modal isOpen={open} onClose={closeModal}>
            <ModalPanel childClassName="w-full md:max-w-3xl">
                <ModalHead 
                    title={`${document ? 'Edit' : 'Create'} Document`} 
                    onClose={closeModal}
                >
                </ModalHead>

                <form onSubmit={handleSubmit(submit)} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-8 mb-8">
                        <FileInput 
                            label="Cover image"
                            placeholder="Upload image files here"
                            formats="JPG, JPEG, PNG, WEBP, GIF"
                            hasError={errors.cover?.type != null}
                            error={errors.cover?.message?.toString()}
                            onChange={(value) => setValue("cover", value)}
                        />

                        <FileInput 
                            label="Attachment File"
                            placeholder="Upload document files here"
                            formats="XLS, PDF"
                            hint="20MB"
                            hasError={errors.attachment?.type != null}
                            error={errors.attachment?.message?.toString()}
                            onChange={(value) => setValue("attachment", value)}
                        />

                        <TextInput 
                            className="md:col-span-2"
                            label="Document Name"
                            hasError={errors.title?.type != undefined}
                            error={errors.title?.message?.toString()}
                            register={register("title")}
                        />

                        <SelectInput 
                            label="Type"
                            displayName="name"
                            valueName="value"
                            defaultValue={watch("type")}
                            options={getDocumentType()}
                            hasError={errors.type?.type != undefined}
                            error={errors.type?.message?.toString()}
                            register={register("type")}
                        />

                        <SwitchInput 
                            value={watch("is_published", 0) == 1 ? true : false }
                            text="Publish"
                            onChange={(value) => setValue("is_published", value ? 1 : 0)}
                        />

                        <SwitchInput 
                            value={watch("is_featured", 0) == 1 ? true : false }
                            text="Is Featured"
                            onChange={(value) => setValue("is_featured", value ? 1 : 0)}
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
            </ModalPanel>
        </Modal>
    )
}
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IconCloudUpload } from "@tabler/icons-react";
import { uploadSchema } from "@/features/foreign-exchange/types";
import { useUploadExchangeRates } from "@/features/foreign-exchange/repositories/exchange-rates";
import { getExchangeRatesExcel } from "@/features/foreign-exchange/requests/exchange-rates";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, ModalPanel, ModalHead } from "@/components/PModal";

import Button from "@/components/Buttons/Button";
import FileInput from "@/components/FormControlls/FileInput";




export default function LocationForm() {
    const navigate = useNavigate();

    const { handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(uploadSchema)
    });

    const createMutation = useUploadExchangeRates(
        () => handleClose()
    );

    const submit = (data: Record<string, any>) => {
        let formData = new FormData();

        if(data.document) {
            formData.append("file", data.document[0]);
        }

        createMutation.mutate(formData);
    }

    const handleClose = () => navigate(-1)

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-xl">
                <ModalHead 
                    title={"Bulk Upload Ratings Data"}
                    onClose={handleClose}
                >
                </ModalHead>
                <div className="p-8">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="space-y-4 mb-8">

                            <FileInput 
                                label="Document"
                                placeholder="Upload excel document here"
                                formats="xls, xlxs"
                                hasError={errors.document?.type != null}
                                error={errors.document?.message?.toString()}
                                onChange={(value: any) => setValue("document", value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <a 
                                href="#"  
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-xs text-tertiary italic hover:text-primary"
                                onClick={getExchangeRatesExcel}
                            >
                                <IconCloudUpload size={16} />
                                <span>download sample file</span>
                            </a>
                        </div>

                        <Button
                            type="submit"
                            intent="primary"
                            loading={createMutation.isPending}
                        >
                            upload
                        </Button>
                    </form>
                </div>
            </ModalPanel>
        </Modal>
    )
}
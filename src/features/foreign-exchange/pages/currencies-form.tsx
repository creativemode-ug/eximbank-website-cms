import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { createCurrencySchema, editCurrencySchema, type Currency } from "@/features/foreign-exchange/types";
import { useCreateCurrency, useEditCurrency } from "@/features/foreign-exchange/repositories/currencies";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, ModalPanel, ModalHead } from "@/components/PModal";

import Button from "@/components/Buttons/Button";
import TextInput from "@/components/FormControlls/TextInput";
import FileInput from "@/components/FormControlls/FileInput";




export default function CurrencyForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const currency = location.state as Currency | null;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(currency ? editCurrencySchema : createCurrencySchema),
        defaultValues: currency ? {
            currency: currency.currency
        } : undefined
    });

    const createMutation = useCreateCurrency(
        () => handleClose()
    );

    const updateMutation = useEditCurrency(
        () => handleClose()
    );

    const submit = (data: Record<string, any>) => {
        let formData = new FormData();

        if(data.flag) {
            formData.append("flag", data.flag[0]);
        }
    
        formData.append("currency", data.currency);

        if(currency) {
            updateMutation.mutate({
                id: currency.id,
                data: formData 
            });
        } else {
            createMutation.mutate(formData);
        }

    }

    const handleClose = () => navigate("/foreign-exchange/currency")

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-lg">
                <ModalHead 
                    title={`${currency ? 'Edit' : 'Create'} Currency`}
                    onClose={handleClose}
                >
                </ModalHead>

                <div className="p-8">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-8 mb-8">
                            <FileInput 
                                className="md:col-span-2"
                                label="Flag"
                                placeholder="Upload image files here"
                                formats="JPG, JPEG, PNG, WEBP, GIF"
                                hasError={errors.flag?.type != null}
                                error={errors.flag?.message?.toString()}
                                onChange={(value) => setValue("flag", value)}
                            />

                            <TextInput 
                                label="Currency"
                                placeholder="eg. EUR/TZS or GBP/TZS"
                                hasError={errors.currency?.type != undefined}
                                error={errors.currency?.message?.toString()}
                                register={register("currency")}
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
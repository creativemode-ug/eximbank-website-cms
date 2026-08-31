import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExchangeRateSchema, TExchangeRateSchema, type ExchangeRate } from "@/features/foreign-exchange/types";
import { useCreateExchangeRate, useEditExchangeRate } from "@/features/foreign-exchange/repositories/exchange-rates";
import { useGetCurrencies } from "@/features/foreign-exchange/repositories/currencies";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal, ModalPanel, ModalHead } from "@/components/PModal";


import Button from "@/components/Buttons/Button";
import SwitchInput from "@/components/FormControlls/SwitchInput";
import TextInput from "@/components/FormControlls/TextInput";
import SelectInput from "@/components/FormControlls/SelectInput";



export default function ExchangeRateForm() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const exchangeRate = location.state as ExchangeRate | null;
    const [currencySelection, setCurrencySelection] = useState<any[]>([]);

    const { currencies } = useGetCurrencies({ 
        page: 1, per_page: 10 
    });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(ExchangeRateSchema),
        defaultValues: exchangeRate ? {
            currency_id: exchangeRate.currency.id,
            buying: exchangeRate.buying,
            selling: exchangeRate.selling,
            is_published: exchangeRate.is_published
        } : undefined
    });

    const createMutation = useCreateExchangeRate(
        () => handleClose()
    );

    const updateMutation = useEditExchangeRate(
        () => handleClose()
    );

    const submit = (data: TExchangeRateSchema) => {
    
        const payload = {
            "currency_id": data.currency_id,
            "buying": data.buying,
            "selling": data.selling,
            "is_published": data.is_published
        }

        if(exchangeRate) {
            updateMutation.mutate({
                id: exchangeRate.id,
                data: payload
            });
        } else {
            createMutation.mutate(payload);
        }

    }

    useEffect(() => {
        if(currencies) {
            const selection = currencies.data.map((i) => ({ name: i.currency, value: i.id.toLowerCase() }))
            setCurrencySelection(selection);
        }
    }, [currencies])

    const handleClose = () => navigate("/foreign-exchange/exchange")

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-2xl">
                <ModalHead
                    title={`${exchangeRate ? 'Edit' : 'Create'} Rate`}
                    onClose={handleClose}
                ></ModalHead>
                <div className="p-8">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-x-8 mb-8">
                            <SelectInput 
                                label="Currency"
                                displayName="name"
                                valueName="value"
                                defaultValue={watch("currency_id")}
                                options={currencySelection}
                                hasError={errors.currency_id?.type != undefined}
                                error={errors.currency_id?.message?.toString()}
                                register={register("currency_id")}
                            />

                            <TextInput 
                                label="Buying"
                                hasError={errors.buying?.type != undefined}
                                error={errors.buying?.message?.toString()}
                                register={register("buying")}
                            />

                            <TextInput
                                label="Selling"
                                hasError={errors.selling?.type != undefined}
                                error={errors.selling?.message?.toString()}
                                register={register("selling")}
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
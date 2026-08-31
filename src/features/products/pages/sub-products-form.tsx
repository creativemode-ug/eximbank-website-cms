import {Link, useParams} from "react-router-dom";
import {IconArrowNarrowLeft, IconMinus, IconPlus} from "@tabler/icons-react";
import LocaleSwitch from "@/components/locale-switch.tsx";
import ActionButton from "@/components/Buttons/action-button.tsx";
import TextField from "@/components/form-fields/text/text-field.tsx";
import TextAreaField from "@/components/form-fields/textarea/text-area-field.tsx";
import SelectField from "@/components/form-fields/select/select-field.tsx";
import Divider from "@/components/divider.tsx";
import Button from "@/components/Buttons/Button.tsx";
import useSubProductForm from "@/features/products/hooks/useSubProductForm.ts";
import {useEffect} from "react";
import {useSearchParamState} from "@/hooks/useSearchParamState.ts";
import {ProductQueryOptions} from "@/features/products/types.ts";

const SubProductsForm = () => {
    const { productId} = useParams();
    const {paramState} = useSearchParamState<ProductQueryOptions>();

    const {
        control,
        submit,
        handleSubmit,
        contentOptions,
        appendOption,
        removeOption,
        setValue,
        fields,
        isPending,
    } = useSubProductForm()


    useEffect(() => {
        if (productId) {
            setValue("product_id", productId);
        }
        if (paramState.locale) {
            setValue("locale", paramState.locale);
        }
    }, [productId, paramState.locale, setValue]);


    return (
        <div className="space-y-16 py-8 h-full">
            <div className="space-y-8">
                <div className="container flex justify-between items-center gap-4">
                    <Link
                        to={`/services/products/${productId}`}
                        className="flex items-center gap-3 text-sm"
                    >
                        <IconArrowNarrowLeft className="size-4"/>
                        <span>Back</span>
                    </Link>
                    <LocaleSwitch/>
                </div>
            </div>

            <div className="w-full xl:max-w-2xl mx-auto ">
                <form
                    className="space-y-8 flex flex-col  justify-between" onSubmit={handleSubmit(submit)}>
                    <div className="space-y-4 h-[70vh] overflow-y-scroll">
                        <TextField
                            text="Name"
                            name={`name`}
                            placeholder="e.g. Corporate Current Account"
                            control={control}
                            required
                        />

                        <TextAreaField
                            text="Description"
                            name={`description`}
                            placeholder="Write sub-product description in details, should not exceed 400 characters"
                            rows={5}
                            control={control}
                        />

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold">
                                Features, Benefits, Reasons, etc
                            </h4>

                            <ul className="space-y-3">
                                {fields.map((field, index) => (
                                    <li
                                        className="flex items-center gap-3"
                                        key={field.id}
                                    >
                                        <SelectField
                                            name={`options.${index}.type`}
                                            control={control}
                                            options={contentOptions}
                                            className="shrink"
                                        />

                                        <TextField
                                            name={`options.${index}.content`}
                                            placeholder="Write content here"
                                            control={control}
                                            className="w-3/4"
                                        />

                                        <ActionButton
                                            className="text-red-500 border border-zinc-200 hover:bg-transparent"
                                            onClick={() =>
                                                removeOption(index)
                                            }
                                        >
                                            <IconMinus className="size-4"/>
                                        </ActionButton>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center gap-2">
                                <Divider axis="x"/>
                                <Button
                                    type="button"
                                    intent="default"
                                    className="border border-zinc-200 bg-transparent"
                                    onClick={appendOption}
                                    leftIcon={<IconPlus className="size-4"/>}
                                >
                                    Add Bullets
                                </Button>
                                <Divider axis="x"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end items-center gap-8 flex-1 h-full">
                        <Button
                            type="submit"
                            intent="primary"
                            loading={isPending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubProductsForm;
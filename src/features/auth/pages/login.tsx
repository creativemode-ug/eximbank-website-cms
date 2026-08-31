import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType } from "yup";
import { useLogin } from "@/repositories/auth_repository";

import Button from "@/components/Buttons/Button";
import TextInput from "@/components/FormControlls/TextInput";



const schema = object().shape({
    email: string().email().required("email is required"),
    password: string().required("password is required"),
})

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const mutation = useLogin(
        () => {}
    );

    const submit = (data: InferType<typeof schema>) => {
        mutation.mutate(data);
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    Welcome Back!
                </h2>

                <p className="text-sm text-zinc-500">
                    Please login to access content management system
                </p>
            </div>

            <form 
                className="grid grid-cols-1 space-y-4"
                onSubmit={handleSubmit(submit)}
            >
                <TextInput 
                    label="Username"
                    hasError={errors.email?.type != undefined}
                    error={errors.email?.message?.toString()}
                    register={register("email")}
                />

                <TextInput
                    label="Password"
                    type="password"
                    hasError={errors.password?.type != undefined}
                    error={errors.password?.message?.toString()}
                    register={register("password")}
                />

                <Button
                    type="submit"
                    intent="primary"
                    size="md"
                    loading={mutation.isPending}
                >
                    Login
                </Button>
            </form>
        </div>
    )
}
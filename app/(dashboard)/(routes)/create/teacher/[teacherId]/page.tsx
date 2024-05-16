"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: "Le nom est requis",
    }),
    lastName: z.string().min(1, {
        message: "Le prénom est requis",
    }),
    username: z.string().min(1, {
        message: "Le nom d'utlisateur est requis",
    }),
    email: z.string().email(),
    bio: z.string().min(1, {
        message: "Une description est requise",
    }),
    country: z.string(),
    streetAddress: z.string(),
    city: z.string(),
    region: z.string(),
    postalCode: z.string(),
});

const CreateProfilePage = ({
    params
}: {
    params: { teacherId: string }
}) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            bio: "",
            country: "",
            streetAddress: "",
            city: "",
            region: "",
            postalCode: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const response = await axios.patch(`/api/teachers/${params.teacherId}`, values);
            router.push(`/teachers/${params.teacherId}/courses`);
            toast.success("Teacher created ");

        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    };

    return (
        <div className="w-full flex justify-center p-6">

            <div className="max-w-10xl  mw-auto ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 lg:text-3xl">Profile</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600 ">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <FormField
                                            name="username"
                                            control={form.control}
                                            render={({ field }) =>
                                                <FormItem>
                                                    <FormLabel htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                                        username
                                                    </FormLabel>
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                                                            <FormDescription className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                                                learnskills.com/
                                                            </FormDescription>
                                                            <FormControl>

                                                                <Input
                                                                    type="text"
                                                                    placeholder="janesmith"
                                                                    {...form.register("username")}
                                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                />

                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </div>
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <FormField
                                            name="bio"
                                            control={form.control}
                                            render={({ field }) =>
                                                <FormItem>
                                                    <FormLabel htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                        About
                                                    </FormLabel>

                                                    <FormControl className="mt-2">
                                                        <textarea
                                                            placeholder="About ..."
                                                            {...form.register("bio")}
                                                            id="bio"
                                                            name="bio"
                                                            rows={3}
                                                            className="block w-full rounded-md outline-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </FormControl>

                                                    <FormDescription className="mt-3 text-sm leading-6 text-gray-600">
                                                        Write a few sentences about yourself.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>


                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 lg:text-3xl">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <FormField
                                            name="firstName"
                                            control={form.control}
                                            render={({ field }) =>
                                                <FormItem>
                                                    <FormLabel htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                                        first name
                                                    </FormLabel>

                                                    <FormControl className="mt-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="firstName"
                                                            {...form.register("firstName")}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </FormControl>

                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <FormField
                                            name="lastName"
                                            control={form.control}
                                            render={({ field }) =>
                                                <FormItem>
                                                    <FormLabel htmlFor="LastName" className="block text-sm font-medium leading-6 text-gray-900">
                                                        last name
                                                    </FormLabel>
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder="lastName"
                                                                {...form.register("lastName")}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>
                                    <div className="sm:col-span-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) =>

                                                <FormItem>
                                                    <FormLabel htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ">
                                                        Email address
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Adresse e-mail"
                                                            {...form.register("email")}
                                                            id="email"
                                                            name="email"
                                                            autoComplete="email"
                                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <FormField
                                            name="country"
                                            control={form.control}
                                            render={({ field }) =>
                                                <FormItem>
                                                    <FormLabel htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Country
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Adresse e-mail"
                                                            {...form.register("country")}
                                                            id="country"
                                                            name="country"
                                                            className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </FormControl>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    <div className="col-span-full">
                                        <FormField
                                            name="streetAddress"
                                            control={form.control}
                                            render={({ field }) =>
                                                <FormItem>
                                                    <FormLabel htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                                        street address
                                                    </FormLabel>
                                                    <div className="mt-2">
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                placeholder="Liberte 6 extension villa 00 .00 ex"
                                                                {...form.register("streetAddress")}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </FormControl>

                                                    </div>
                                                    <FormDescription />
                                                    <FormMessage />
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <FormField
                                            name="city"
                                            control={form.control}
                                            render={({ field }) =>

                                                <FormItem>
                                                    <FormLabel htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </FormLabel>
                                                    <FormControl>

                                                        <div className="mt-2">
                                                            <Input
                                                                type="text"
                                                                id="city"
                                                                {...form.register("city")}
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <FormField
                                            name="region"
                                            control={form.control}
                                            render={({ field }) =>

                                                <FormItem>
                                                    <FormLabel htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State / Province
                                                    </FormLabel>
                                                    <FormControl>

                                                        <div className="mt-2">
                                                            <Input
                                                                type="text"
                                                                id="region"
                                                                {...form.register("region")}
                                                                autoComplete="address-level2"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            }
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <FormField
                                            name="postalCode"
                                            control={form.control}
                                            render={({ field }) =>

                                                <FormItem>
                                                    <FormLabel htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                        ZIP / Postal code
                                                    </FormLabel>
                                                    <FormControl>

                                                        <div className="mt-2">
                                                            <Input
                                                                type="text"
                                                                {...form.register("postalCode")}
                                                                id="postal-code"
                                                                autoComplete="postal-code"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            }
                                        />
                                    </div>
                                </div>
                                  {/* <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 lg:text-3xl">Notifications</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    We'll always let you know about important changes, but you pick what else you want to hear about.
                                </p>

                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                        <div className="mt-6 space-y-6">
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="comments"
                                                        name="comments"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                                        Comments
                                                    </label>
                                                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                                </div>
                                            </div>
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="candidates"
                                                        name="candidates"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="candidates" className="font-medium text-gray-900">
                                                        Candidates
                                                    </label>
                                                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                                </div>
                                            </div>
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="offers"
                                                        name="offers"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="offers" className="font-medium text-gray-900">
                                                        Offers
                                                    </label>
                                                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="push-everything"
                                                    name="push-notifications"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Everything
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="push-email"
                                                    name="push-notifications"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Same as email
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="push-nothing"
                                                    name="push-notifications"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                    No push notifications
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>  */}
                            </div>

                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateProfilePage;
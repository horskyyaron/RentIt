"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import React, { useState } from "react";
import { ArrowBigRightDash } from "lucide-react";

type Inputs = {
    example: string;
    exampleRequired: string;
    range: RangePickerProps;
};

const { RangePicker } = DatePicker;

export default function App() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div className="flex flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col space-y-1"
            >
                {/* register your input into the hook by invoking the "register" function */}
                <input defaultValue="test" {...register("example")} />
                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("exampleRequired", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                <Controller
                    name="range"
                    control={control}
                    render={({ field }) => (
                        // @ts-ignore
                        <RangePicker {...field} separator={<ArrowBigRightDash />} />
                    )}
                />

                <input type="submit" />
            </form>
        </div>
    );
}

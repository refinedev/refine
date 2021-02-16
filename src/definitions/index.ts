import { BaseFieldProps } from "@interfaces";

export const fieldContent = ({ record, source }: BaseFieldProps) => {
    const stringSource = source.toString()
    return record ? record?.[stringSource] : stringSource
}
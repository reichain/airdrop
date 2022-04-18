export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

// TODO: how to make this can select only field to non nullable
export type NonNullableField<T> = {
    [P in keyof T]: NonNullable<T[P]>
}

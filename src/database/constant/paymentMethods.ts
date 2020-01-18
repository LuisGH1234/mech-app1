import { PaymentMethod } from "../../entity";

export const paymentMethods: PaymentMethod[] = [
    {
        code: "PMM1",
        translations: [
            {
                language: "spanish",
                isDefault: true,
                description: "efectivo"
            },
            {
                language: "english",
                isDefault: false,
                description: "cash"
            }
        ]
    },
    {
        code: "PMM2",
        translations: [
            {
                language: "spanish",
                isDefault: true,
                description: "tarjeta"
            },
            {
                language: "english",
                isDefault: false,
                description: "card"
            }
        ]
    }
];

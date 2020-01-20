import { PaymentMethod } from "../../entity";
import { Language } from "../../@types";

export const paymentMethods: PaymentMethod[] = [
    {
        code: "PMM1",
        translations: [
            {
                language: Language.SPANISH,
                isDefault: true,
                description: "efectivo"
            },
            {
                language: Language.ENGLISH,
                isDefault: false,
                description: "cash"
            }
        ]
    },
    {
        code: "PMM2",
        translations: [
            {
                language: Language.SPANISH,
                isDefault: true,
                description: "tarjeta"
            },
            {
                language: Language.ENGLISH,
                isDefault: false,
                description: "card"
            }
        ]
    }
];

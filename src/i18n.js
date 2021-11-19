import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    es: {
        translation: {
            "Welcome to React": "Las traducciones funcionan",
            "Add": "Agregar",
            "Edit": "Editar",
            "Enable": "Habilitar",

            "LONG": "LARGO",
            "SHORT": "CORTO",
            "Max Size $": "Posición Máxima $",
            "Risk Level $/sh": "Nivel de Riesgo $/Sh",
            "Reward Level $/Sh": "Nivel de Recompensa $/Sh",
            "PLAN": "PLAN",
            "Reference Entry $/Sh": "Nivel de Entrada",
            "Suggested Shares Sh": "Acciones Sugeridas Sh",
            "PLAN RESULTS": "RESULTADOS DEL PLAN",
            "Average Price": "Precio Promedio",
            "Shares": "Acciones",
            "Size": "Posición",
            "Reward": "Recompensa",
            "Loss at Risk": "Pérdida al Riesgo",
            "Risk Reward": "Relación Riesgo Recompensa",
            "TRADES": "TRADES",
            "ADD TRADE": "AGREGAR TRADE",
            "Price $/Sh": "Precio $/Sh",
            "BUY": "COMPRAR",
            "SELL": "VENDER",
            "SHORT": "SHORT",
            "COVER": "CUBRIR",
            "Edit": "Editar",
            "TRADES RESULT": "RESULTADOS DEL TRADE",
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
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
            "Enable": "Habilitar",
            "Are you sure?": "¿Estas segur@?",

            "Long": "Largo",
            "Short": "Corto",
            "Max Size $": "Posición Máxima $",
            "Risk Level $/sh": "Nivel de Riesgo $/Sh",
            "Reward Level $/Sh": "Nivel de Recompensa $/Sh",
            "PLAN": "PLAN",
            "Reference Entry $/Sh": "Nivel de Entrada",
            "Suggested Shares Sh": "Acciones Sugeridas Sh",
            "PLAN RESULTS": "RESULTADOS DEL PLAN",
            "Average price": "Precio promedio",
            "Shares": "Acciones",
            "Size": "Posición",
            "Reward": "Recompensa",
            "Loss at Risk": "Pérdida al Riesgo",
            "Risk Reward": "Relación Riesgo Recompensa",
            "TRADES": "TRADES",
            "Add trade": "Agregar trade",
            "Price $/Sh": "Precio $/Sh",
            "BUY": "COMPRAR",
            "SELL": "VENDER",
            "COVER": "CUBRIR",
            "Edit": "Editar",
            "Trades result": "Resultados del trade",
            "Give us your feedback": " En que podemos mejorar",
            "Spanish": "Español",
            "English": "Inglés",
            "Rules": "Reglas",
            "Cancel": "Cancelar",
            "Reglas": "Rules",


            "Max Size": "Posición Máxima por trade",
            "Max Loss": "Pérdida máxima por trade",
            "Risk level price": "Precio de Riesgo",
            "Reward level price": "Precio de Recompensa",
            "Plan": "Plan",
            "Reference Entry": "Nivel de Entrada",
            "Suggested Shares": "Acciones Sugeridas",
            "Plan results": "Resultados del plan",
            "Plan results executed": "Resultados del plan ejecutado",
            "Total shares": "Total de acciones",
            "Planned Reward": "Recompensa esperada",
            "Planned Loss": "Pérdida posible",
            "Price": "Precio",
            "delete all": "borrar todo",
            "Buy": "Comprar",
            "Sell": "Vender",
            "Cover": "Cubrir",
            "Executed": "Ejecutado",
            "Executed Results": "Resultados de las ejecuciones",

            "Reference Shares": "Acciones de referencia",
            "You won't be able to revert this!": "No podrás revertir esto",
            "Yes, delete it!": "Si, eliminalo!",
            "Your feedback is important for us, if you want to tell us how can we get better please click here and fill the next form":
                "Tu opinion es importante para nosotros, si quieres recomendarnos como podemos mejorar por favor da click aqui y danos la información en el siguiente formulario",
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
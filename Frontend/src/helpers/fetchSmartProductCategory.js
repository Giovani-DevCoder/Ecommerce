import SummaryApi from "../common";

const fetchSmartProductCategory = async (category) => {
    if (!category) {
        throw new Error("La categoría no puede estar vacía");
    }

    console.log("Categoría enviada al backend:", category);

    try {
        const response = await fetch(SummaryApi.categorySmartProduct.url, {
            method: SummaryApi.categorySmartProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                category: category, 
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("La respuesta no es un JSON válido");
        }

        const dataResponse = await response.json();

        return dataResponse;
    } catch (error) {
        throw error;
    }
};

export default fetchSmartProductCategory;
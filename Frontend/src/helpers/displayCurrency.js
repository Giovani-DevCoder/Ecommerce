const displayUSDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: 'USD', // Cambiamos a dólares estadounidenses
        minimumFractionDigits: 2
    });

    return formatter.format(num);
};

export default displayUSDCurrency;
export const NestedModal = ({ baseType, variants, setVariants, base, setBaseModal, baseIndex, setBaseIndex }: any) => {
    const handleChange = (e: any) => {
        const value = e.target.value;
        console.log(baseType);
        setVariants(
            variants?.map((obj: any, i: number) => {
                if (i == baseIndex) {
                    return { ...obj, base: { ...obj?.base, [baseType]: value } };
                }
                return obj;
            })
        );
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg relative w-80">
                <h2 className="text-xl font-semibold mb-3">Select an Option</h2>
                <select onChange={(e) => handleChange(e)} className="w-full p-2 border rounded-md">
                    {base?.map((obj: any) => {
                        return <option value={obj?.base}>{obj?.base}</option>;
                    })}
                </select>
                <button onClick={() => setBaseModal(false)} className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                    Close
                </button>
            </div>
        </div>
    );
};

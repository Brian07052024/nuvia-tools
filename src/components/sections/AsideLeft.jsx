function AsideLeft() {

    const formats = ["16:9", "1:1", "9:16", "4:3"];

    return (

        <div className="bg-white col-span-2 p-4 rounded-2xl gap-5 flex flex-col overflow-y-scroll">
            <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out">

                <span className="text-gray-800 font-medium">Formato</span>

                <div className="grid grid-cols-2 gap-1 gap-y-1">
                    {
                        formats.map((formato, idx) => {
                            return (
                                <div key={idx} className="cursor-pointer w-full h-8 rounded-full border text-gray-500 border-gray-300 text-center flex items-center justify-center">{formato}</div>
                            )

                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default AsideLeft;
import { memo } from "react";

function Spinner() {
    return (
        <div className="h-lvh w-lvw animate-fade flex justify-center items-center">
            <img src="/img/nuviaLogo.png" alt="spinner" className="size-32 object-contain" />
        </div>
    );
}

export default memo(Spinner);


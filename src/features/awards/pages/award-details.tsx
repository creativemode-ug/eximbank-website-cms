import { useLocation, useNavigate } from "react-router-dom";
import { IconAward } from "@tabler/icons-react";
import type { Award } from "@/features/awards/types";

import Modal from "@/components/Modal";



export default function AwardDetails() {
    const navigate = useNavigate();
    const location = useLocation();

    const award = location.state as Award | null;

    const close = () => navigate(-1);

    return (
        <Modal
            isOpen={true}
            onClose={close}
            size="sm"
        >
            {
                award && (
                <div className="flex flex-col items-center">
                    <IconAward 
                        className="w-24 h-24 text-secondary" 
                        strokeWidth={1} 
                    />

                    <h2 className="text-2xl text-secondary font-semibold mb-2">
                        {award.name}
                    </h2>

                    <h4 className="text-sm text-zinc-400 mb-4">
                        {award.year}
                    </h4>

                    <p className="text-sm text-zinc-600 text-center">
                        {award.description}
                    </p>
                </div>
            )}
        </Modal>
    )
}
import React from "react";
import Stepper, { Step } from "./Stepper";

const Stepers = ({ data }) => {
  // Mapping status ke step
  const getInitialStep = () => {
    if (data === null) return 1;
    if (data === false) return 2;
    if (data === true) return 3;
    return 1;
  };

  return (
    <div className="lg:mt-0 mt-10">
      <Stepper
        initialStep={getInitialStep()}
        disableStepIndicators
        backButtonProps={{ style: { display: "none" } }}
        nextButtonProps={{ style: { display: "none" } }}
      >
        <Step>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[#9E1C1C]">
              Status Pengajuan Belum Diproses
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Permohonan Anda telah diterima dan menunggu verifikasi admin.
            </p>
          </div>
        </Step>

        <Step>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[#9E1C1C]">
              Sedang Diproses
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Permohonan Anda sedang dalam tahap peninjauan oleh PPID.
            </p>
          </div>
        </Step>

        <Step>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-[#9E1C1C]">
              Selesai Diproses
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Permohonan Anda telah selesai diproses.
            </p>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default Stepers;
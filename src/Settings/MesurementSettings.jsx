import React, { useEffect, useState } from "react";
import useApi from "../Services/AxiosInstance";
import MesurementItemSetting from "./MesurementItemSetting";

function MesurementSettings() {
  const [currentType, setCurrentType] = useState("");
  const {
    data: mesurementType,
    get: get_mesure,
    post: post_mesure,
    patch: patch_mesure,
  } = useApi();

  const [trigger, setTrigger] = useState(new Date())

  useEffect(() => {
    get_mesure("/measurement-types");
  }, [trigger]);

  return (
    <>
      <div className="new-container">
        <div className="new-header ">تنظمیات اندازه گیری</div>
        <div className="step-guide">
          {mesurementType?.results?.map((type, index) => (
            <>
              <div
                key={index}
                className={`step-item ${
                  currentType === type.name ? "active" : ""
                }`}
                onClick={() => setCurrentType(type.name)}
                >
                {type.name}
              </div>
            </>
          ))}
        </div>
      </div>

      {mesurementType?.results?.map((type) => (
        currentType === type.name && <MesurementItemSetting type={type} setTrigger={setTrigger}/>
      ))}
    </>
  );
}

export default MesurementSettings;

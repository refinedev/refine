import React from "react";
import { availableUIPackages } from "../../context/TutorialUIPackageContext/index";
import { useTutorialUIPackage } from "../../hooks/use-tutorial-ui-package";

export const SelectTutorialFramework = ({ defaultValue }) => {
    const { preferred, setPreferred } = useTutorialUIPackage();

    return (
        <div>
            <h3>Select UI Framework</h3>
            <div>
                {availableUIPackages.map((uiPackage) => (
                    <div key={uiPackage}>
                        <input
                            type="radio"
                            id={uiPackage}
                            name="uiPackage"
                            value={uiPackage}
                            defaultValue={defaultValue}
                            checked={preferred === uiPackage}
                            onChange={() => setPreferred(uiPackage)}
                        />
                        <label htmlFor={uiPackage}>{uiPackage}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

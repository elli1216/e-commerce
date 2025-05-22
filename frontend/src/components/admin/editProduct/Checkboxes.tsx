import { tags } from "../../../data/data";
import { type CheckboxesProps } from "../../../types/input";

const Checkboxes = ({
  handleChange,
  formData,
}: CheckboxesProps): React.JSX.Element => {
  return (
    <div className="grid grid-cols-[repeat(4,1fr)] gap-2">
      {Object.entries(tags).map(([categoryName, categoryTags]) => (
        <div key={categoryName} className="flex flex-col gap-2">
          <label className="text-sm">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </label>
          <div className="grid grid-cols-[1fr] gap-2">
            {Object.entries(categoryTags).map(([tagName]) => (
              <div key={tagName} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={tagName}
                  name={`${categoryName}_${tagName}`}
                  checked={
                    (
                      formData.productTags as Record<
                        string,
                        Record<string, string>
                      >
                    )[categoryName][tagName] === "true"
                  }
                  onChange={handleChange}
                />
                <label className="text-sm" htmlFor={tagName}>
                  {tagName}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
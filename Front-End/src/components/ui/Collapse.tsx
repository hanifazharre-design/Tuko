import { useState } from "react";

interface CollapseProps {
  title: string;
  description: string;
}

const Collapse = ({ title, description }: CollapseProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left font-semibold text-red-900"
      >
        {title}
      </button>

      {open && (
        <p className="mt-2 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default Collapse;
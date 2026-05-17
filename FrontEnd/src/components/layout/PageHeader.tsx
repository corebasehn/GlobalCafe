import { type LucideIcon } from "lucide-react";
import { Button } from "react-bootstrap";

type Action = {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "outline";
};

type Props = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  actions?: Action[];
  children?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  actions,
  children,
}: Readonly<Props>) {
  return (
    <div className="mb-6">
      <div className="flex flex-row items-start justify-between gap-4 mt-2">
        <div className="flex items-start gap-4">
          {Icon && (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mt-2"
              style={{ backgroundColor: iconBg || "#f3f4f6" }}
            >
              <Icon className="w-6 h-6" style={{ color: iconColor || "#6b7280" }} />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
            {subtitle && <p className="text-neutral-600 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {actions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <Button
                  key={idx}
                  variant={action.variant || "primary"}
                  onClick={action.onClick}
                  className="btn-wave d-flex align-items-center gap-2"
                >
                  {ActionIcon && <ActionIcon className="w-4 h-4" />}
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

interface Props {
  password: string;
}

const LEVEL = [
  { label: "Fraca", bar: "bg-danger", text: "text-danger" },
  { label: "Média", bar: "bg-warning", text: "text-warning" },
  { label: "Forte", bar: "bg-success", text: "text-success" },
];

const PasswordStrength: React.FC<Props> = ({ password }) => {
  const score = [
    password.length >= 6,
    /\d/.test(password),
    /[A-Z]/.test(password),
  ].filter(Boolean).length;

  const filled = password ? Math.max(score, 1) : 0;
  const level = LEVEL[Math.max(score, 1) - 1];

  return (
    <div className="pt-2">
      <div className="grid grid-cols-3 gap-2">
        {LEVEL.map((item, index) => (
          <span
            key={item.label}
            className={`h-1 rounded-full ${index < filled ? level.bar : "bg-border"}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 pt-1.5 text-[12px]">
        <span className="text-text-secondary">
          Mínimo 6 caracteres, com 1 número e 1 letra maiúscula.
        </span>
        {password && (
          <span className={`shrink-0 font-semibold ${level.text}`}>
            {level.label}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;

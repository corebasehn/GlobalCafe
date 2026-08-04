interface LoginHeaderProps {
  title: string;
  logoSrc: string;
}

export default function LoginHeader({ title, logoSrc }: LoginHeaderProps) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <h2 className="h4 fw-semibold mb-0" style={{ color: 'rgb(161, 95, 38)' }}>
        {title}
      </h2>
      <img 
        src={logoSrc} 
        alt="eCoffe Core" 
        style={{ height: '100px', width: 'auto' }}
      />
    </div>
  );
}

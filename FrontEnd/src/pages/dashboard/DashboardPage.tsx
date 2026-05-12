import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Package, 
  Truck, 
  Factory,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { moduleColors } from "../../config/colors.config";
import { getResumenHoyApi } from "../../api/reception.api";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getResumenHoyApi();
        setData(res);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar los datos del dashboard");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Loader2 size={40} className="text-primary mb-3" style={{ animation: 'spin 1s linear infinite' }} />
        <span className="fs-5 fw-medium text-muted">Cargando métricas operativas...</span>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Container>
    );
  }

  const stats = [
    { title: "Ingresos Hoy", value: data?.stats?.ingresosHoy || 0, change: "Vehículos", changeType: "neutral" as const, icon: Truck, module: "recepcion" },
    { title: "Sacos Declarados", value: data?.stats?.sacosHoy || 0, change: "Hoy", changeType: "neutral" as const, icon: Package, module: "recepcion" },
    { title: "Volumen Estimado", value: `${data?.stats?.qqHoy ? Number(data.stats.qqHoy).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "0.00"} QQ`, change: "Hoy", changeType: "neutral" as const, icon: TrendingUp, module: "recepcion" },
    { title: "Vehículos en Patio", value: data?.stats?.enProceso || 0, change: "En proceso", changeType: "positive" as const, icon: Clock, module: "recepcion" },
  ];

  // Filtramos para mostrar solo las tareas que tienen algo pendiente (cantidad > 0)
  const pendingTasks = [
    { id: 1, task: `${data?.pendientes?.muestreo || 0} vehículos esperando toma de muestra`, module: "recepcion", status: "pendiente", link: "/recepcion/remision" },
    { id: 2, task: `${data?.pendientes?.laboratorio || 0} muestras en laboratorio por analizar`, module: "recepcion", status: "en_proceso", link: "/recepcion/laboratorio" },
    { id: 3, task: `${data?.pendientes?.gerencia || 0} análisis esperando veredicto de gerencia`, module: "recepcion", status: "urgente", link: "/recepcion/gerencia" },
    { id: 4, task: `${data?.pendientes?.bascula || 0} equipo esperando pesaje en báscula`, module: "recepcion", status: "pendiente", link: "/recepcion/bascula-entrada" },
  ].filter(t => parseInt(t.task.split(' ')[0]) > 0);

  const recentActivity: { id: number; action: string; time: string; module: string; detail: string }[] = data?.actividad?.map((act: any) => ({
    id: act.id,
    action: `Ingreso ${act.numero_entrada} registrado`,
    time: new Date(act.fecha).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    module: "recepcion",
    detail: `${act.transporte} • ${act.sacos || 0} Sacos • ${Number(act.qq || 0).toFixed(2)} QQ`
  })) || [];

  return (
    <Container fluid className="py-4">
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted mb-0">Vista general del sistema Global Café</p>
      </div>

      {/* Cards de estadísticas principales */}
      <Row className="g-4 mb-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = moduleColors[stat.module as keyof typeof moduleColors];
          return (
            <Col key={stat.title} xs={12} sm={6} lg={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="flex-grow-1">
                      <p className="text-muted small mb-2">{stat.title}</p>
                      <h2 className="h3 fw-bold mb-1">{stat.value}</h2>
                      <p className={`small mb-0 ${stat.changeType === "positive" ? "text-success" : "text-muted"}`}>
                        {stat.change}
                      </p>
                    </div>
                    <div 
                      className="rounded-3 p-3 d-flex align-items-center justify-content-center" 
                      style={{ backgroundColor: colors.bg, minWidth: '56px', minHeight: '56px' }}
                    >
                      <Icon size={24} style={{ color: colors.icon }} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Tareas Pendientes y Actividad Reciente */}
      <Row className="g-4 mb-4">
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-3">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0 fw-bold">Tareas Pendientes</h5>
                <span className="badge bg-secondary">{pendingTasks.length} tareas</span>
              </div>
            </Card.Header>
            <Card.Body>
              {pendingTasks.length === 0 ? (
                <div className="text-center py-5">
                  <CheckCircle size={48} className="text-success mb-3 opacity-50" />
                  <p className="text-muted mb-0">No hay tareas pendientes en Recepción</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {pendingTasks.map((task) => {
                    const colors = moduleColors[task.module as keyof typeof moduleColors];
                    return (
                      <Link 
                        to={task.link} 
                        key={task.id} 
                        className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light text-decoration-none"
                        style={{ transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      >
                        <div 
                          className="rounded-circle" 
                          style={{ 
                            width: '8px', 
                            height: '8px', 
                            backgroundColor: colors.border,
                            flexShrink: 0
                          }}
                        />
                        <div className="flex-grow-1 text-truncate">
                          <p className="small fw-medium text-dark mb-0">{task.task}</p>
                        </div>
                        {task.status === "urgente" && (
                          <span className="badge bg-danger d-flex align-items-center gap-1">
                            <AlertCircle size={12} /> Urgente
                          </span>
                        )}
                        {task.status === "en_proceso" && (
                          <span className="badge bg-primary d-flex align-items-center gap-1">
                            <Clock size={12} /> En proceso
                          </span>
                        )}
                        {task.status === "pendiente" && (
                          <span className="badge bg-warning d-flex align-items-center gap-1">
                            <Clock size={12} /> Pendiente
                          </span>
                        )}
                        <ArrowRight size={16} className="text-muted" style={{ flexShrink: 0 }} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-bottom py-3">
              <h5 className="mb-0 fw-bold">Actividad Reciente</h5>
            </Card.Header>
            <Card.Body>
              {recentActivity.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">No hay actividad reciente hoy.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {recentActivity.map((activity) => {
                    const colors = moduleColors[activity.module as keyof typeof moduleColors];
                    return (
                      <div key={activity.id} className="d-flex gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: colors.bg,
                            flexShrink: 0
                          }}
                        >
                          <CheckCircle size={20} style={{ color: colors.icon }} />
                        </div>
                        <div className="flex-grow-1">
                          <p className="small fw-medium mb-1">{activity.action}</p>
                          <p className="small text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                            {activity.detail}
                          </p>
                          <p className="small text-muted mb-0" style={{ fontSize: '0.7rem' }}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Acceso Rápido */}
      <div className="mb-4">
        <h5 className="fw-semibold mb-3">Acceso Rápido</h5>
        <Row className="g-3">
          {[
            { name: "Recepción", to: "/recepcion/remision", module: "recepcion", icon: Package },
            { name: "Comercial", to: "/comercial/contratos", module: "comercial", icon: TrendingUp },
            { name: "Industrial", to: "/industrial/programa", module: "industrial", icon: Factory },
            { name: "Despacho", to: "/despacho/contenedores", module: "despacho", icon: Truck },
            { name: "Ventas", to: "/ventas/kardex", module: "ventas", icon: ShoppingCart },
          ].map((item) => {
            const colors = moduleColors[item.module as keyof typeof moduleColors];
            const Icon = item.icon;
            return (
              <Col key={item.name} xs={6} sm={4} md={4} lg={2} className="col-6">
                <Link 
                  to={item.to} 
                  className="d-block p-4 rounded-3 border border-2 text-decoration-none h-100"
                  style={{ 
                    backgroundColor: colors.bg, 
                    borderColor: colors.border,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={32} className="mb-2" style={{ color: colors.icon }} />
                  <p className="fw-medium mb-0" style={{ color: colors.text }}>{item.name}</p>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
}

import { http } from "./http";

export interface NotificationItem {
  id: number;
  titulo: string;
  mensaje: string;
  rol_destino?: string | null;
  usuario_id?: number | null;
  tipo?: string | null;
  icono?: string | null;
  leido: boolean;
  referencia_id?: string | null;
  ruta?: string | null;
  created_at: string;
  updated_at: string;
}

export async function getUnreadNotificationsApi(): Promise<NotificationItem[]> {
  const { data } = await http.get<NotificationItem[]>("/notifications/unread");
  return data;
}

export async function markNotificationAsReadApi(id: number): Promise<void> {
  await http.patch(`/notifications/${id}/read`);
}

export async function markAllNotificationsAsReadApi(): Promise<void> {
  await http.patch("/notifications/read-all");
}

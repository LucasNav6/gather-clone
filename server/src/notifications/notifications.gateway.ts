import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { UseGuards, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AuthentificationGuard } from 'src/authentification/authentification.guard';

@WebSocketGateway({
  namespace: 'notifications',
  cors: { origin: '*' }, // ajusta según tu front
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(NotificationsGateway.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  async handleConnection(client: Socket) {
    if (!client.data?.user) {
      this.logger.warn(`Conexión sin usuario, desconectando socket ${client.id}`);
      client.disconnect();
      return;
    }
    const userUuid = client.data.user._uuid ?? client.data.user.id ?? client.data.user.sub;
    client.join(userUuid); // cada usuario tiene su "room" privado
    this.logger.log(`Cliente conectado: ${client.id} user=${userUuid}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @UseGuards(AuthentificationGuard)
  @SubscribeMessage('notifications:create')
  async create(@MessageBody() createDto: CreateNotificationDto) {
    return this.notificationsService.create(createDto);
  }

  // Listar todas las notificaciones del usuario
  @UseGuards(AuthentificationGuard)
  @SubscribeMessage('notifications:list')
  async list(@ConnectedSocket() client: Socket): Promise<WsResponse<any>> {
    const userUuid = client.data.user._uuid ?? client.data.user.id ?? client.data.user.sub;
    const items = await this.notificationsService.findForUser(userUuid);
    return { event: 'notifications:list:ok', data: items };
  }

  // Marcar como leído
  @UseGuards(AuthentificationGuard)
  @SubscribeMessage('notifications:markRead')
  async markRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { _uuid: string },
  ): Promise<WsResponse<any>> {
    const userUuid = client.data.user._uuid ?? client.data.user.id ?? client.data.user.sub;
    const notif = await this.notificationsService.markAsRead(body._uuid, userUuid);
    return { event: 'notifications:markRead:ok', data: notif };
  }

  // Soft delete
  @UseGuards(AuthentificationGuard)
  @SubscribeMessage('notifications:delete')
  async softDelete(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { _uuid: string },
  ): Promise<WsResponse<any>> {
    const userUuid = client.data.user._uuid ?? client.data.user.id ?? client.data.user.sub;
    const result = await this.notificationsService.softDelete(body._uuid, userUuid);
    return { event: 'notifications:delete:ok', data: result };
  }
}

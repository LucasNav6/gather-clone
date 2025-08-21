import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(opts: {
  recipientUuid: string;
  title: string;
  description?: string;
  data?: string;
  senderUuid?: string;
}): Promise<Notification> {
  const notif = this.notificationRepo.create({
    recipientUuid: opts.recipientUuid,
    senderUuid: opts.senderUuid ?? null,
    title: opts.title,
    description: opts.description ?? null,
    data: opts.data ?? null, // <-- string
  });

  const saved = await this.notificationRepo.save(notif);

  // saved es un Notification, no un array
  this.logger.log(`Notification ${saved._uuid} -> ${saved.recipientUuid}`);
  return saved;
}


  findForUser(recipientUuid: string) {
    return this.notificationRepo.find({
      where: { recipientUuid },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(_uuid: string, recipientUuid: string) {
    const notif = await this.notificationRepo.findOne({
      where: { _uuid, recipientUuid },
    });
    if (!notif) throw new NotFoundException('Notificación no encontrada');
    if (!notif.isRead) {
      notif.isRead = true;
      await this.notificationRepo.save(notif);
    }
    return notif;
  }

  async softDelete(_uuid: string, recipientUuid: string) {
    const notif = await this.notificationRepo.findOne({
      where: { _uuid, recipientUuid },
    });
    if (!notif) throw new NotFoundException('Notificación no encontrada');
    await this.notificationRepo.softRemove(notif);
    return { ok: true };
  }
}

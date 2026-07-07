import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendWelcomeEmail(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome! Your account has been created',
      template: './welcome',
      context: {
        name: `${user.firstName} ${user.lastName ?? ''}`.trim(),
        email: user.email,
      },
    });
  }
}

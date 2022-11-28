import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { createMessageDto } from './dtos/create-nessage.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body:createMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id:string) {
    const message = await this.messagesService.findOne(id);
    if (message === undefined) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }
}

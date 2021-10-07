import { Request, Response } from 'express';
import Ajv from 'ajv';
import { sendToDiscord } from '../app/lib/feedback/server';

export const handlePostFeedback = async (req: Request, res: Response) => {
  const ajv = new Ajv();
  const valid = ajv.validate(
    {
      type: 'object',
      properties: {
        discordTag: {
          type: 'string',
        },
        summonerName: {
          type: 'string',
        },
        platformId: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    req.body
  );
  if (!valid) {
    return res.status(422).json(ajv.errors);
  }

  const { discordTag, message, summonerName, platformId } = req.body;
  await sendToDiscord({ discordTag, message, summonerName, platformId });
  res.json({});
};

import { CommandFactory } from 'nest-commander';

import { CommandModule } from './command.module';

const bootstrap = async () => {
  await CommandFactory.run(CommandModule, {
    errorHandler: (err) => {
      console.log(err.message);
      process.exit(0);
    },
  });
};

bootstrap();

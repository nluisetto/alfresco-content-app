/*
 * Copyright 2005-2019 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { ParamType } from './params';
import { BaseParamOptions, CommanderOptionParams, BaseParam } from './base-param';

export class BooleanParam extends BaseParam {
  protected type = ParamType.confirm;

  get commanderOption(): CommanderOptionParams {
    const optionParams: CommanderOptionParams = [`-${this.options.alias}, --${this.options.name}`, this.options.title];

    if (this.options.processor !== undefined) {
      optionParams.push(this.options.processor);
    } else {
      optionParams.push((value, previousValue) => {
        return value !== undefined ? !!value : previousValue;
      });
    }

    if (this.options.default !== undefined) {
      optionParams.push(this.options.default);
    }

    return optionParams;
  }

  get inquirerOption() {
    return {
      type: this.type,
      name: this.options.name,
      message: this.options.title
    };
  }
}

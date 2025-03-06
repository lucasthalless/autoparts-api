import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphqlService {
  static async checkFieldInRequest(info: any, field: string) {
    const fields = info.fieldNodes[0].selectionSet.selections.map(
      (field: any) => field.name.value,
    );
    if (!fields.includes(field)) {
      return false;
    }
    return true;
  }
}

import {GenericDatapointsService} from "../services/generic_datapoints";
import {GenericCreatePage} from "../pages/create/create";

export interface DataType {
  model: GenericDatapointsService,
  chartableProperties: string,
  chartOptions: any,

  defaults?: any
}

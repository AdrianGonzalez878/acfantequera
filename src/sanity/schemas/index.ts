import type { SchemaTypeDefinition } from "sanity";

import { recurso } from "./recurso";
import { tema } from "./tema";

export const schemaTypes: SchemaTypeDefinition[] = [recurso, tema];

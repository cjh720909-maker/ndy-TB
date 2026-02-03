
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Driver
 * 
 */
export type Driver = $Result.DefaultSelection<Prisma.$DriverPayload>
/**
 * Model FeeMaster
 * 
 */
export type FeeMaster = $Result.DefaultSelection<Prisma.$FeeMasterPayload>
/**
 * Model SettlementHistory
 * 
 */
export type SettlementHistory = $Result.DefaultSelection<Prisma.$SettlementHistoryPayload>
/**
 * Model Affiliation
 * 
 */
export type Affiliation = $Result.DefaultSelection<Prisma.$AffiliationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Drivers
 * const drivers = await prisma.driver.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Drivers
   * const drivers = await prisma.driver.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.driver`: Exposes CRUD operations for the **Driver** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drivers
    * const drivers = await prisma.driver.findMany()
    * ```
    */
  get driver(): Prisma.DriverDelegate<ExtArgs>;

  /**
   * `prisma.feeMaster`: Exposes CRUD operations for the **FeeMaster** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeeMasters
    * const feeMasters = await prisma.feeMaster.findMany()
    * ```
    */
  get feeMaster(): Prisma.FeeMasterDelegate<ExtArgs>;

  /**
   * `prisma.settlementHistory`: Exposes CRUD operations for the **SettlementHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SettlementHistories
    * const settlementHistories = await prisma.settlementHistory.findMany()
    * ```
    */
  get settlementHistory(): Prisma.SettlementHistoryDelegate<ExtArgs>;

  /**
   * `prisma.affiliation`: Exposes CRUD operations for the **Affiliation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Affiliations
    * const affiliations = await prisma.affiliation.findMany()
    * ```
    */
  get affiliation(): Prisma.AffiliationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Driver: 'Driver',
    FeeMaster: 'FeeMaster',
    SettlementHistory: 'SettlementHistory',
    Affiliation: 'Affiliation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "driver" | "feeMaster" | "settlementHistory" | "affiliation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Driver: {
        payload: Prisma.$DriverPayload<ExtArgs>
        fields: Prisma.DriverFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DriverFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DriverFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findFirst: {
            args: Prisma.DriverFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DriverFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          findMany: {
            args: Prisma.DriverFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          create: {
            args: Prisma.DriverCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          createMany: {
            args: Prisma.DriverCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DriverCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>[]
          }
          delete: {
            args: Prisma.DriverDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          update: {
            args: Prisma.DriverUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          deleteMany: {
            args: Prisma.DriverDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DriverUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DriverUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DriverPayload>
          }
          aggregate: {
            args: Prisma.DriverAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDriver>
          }
          groupBy: {
            args: Prisma.DriverGroupByArgs<ExtArgs>
            result: $Utils.Optional<DriverGroupByOutputType>[]
          }
          count: {
            args: Prisma.DriverCountArgs<ExtArgs>
            result: $Utils.Optional<DriverCountAggregateOutputType> | number
          }
        }
      }
      FeeMaster: {
        payload: Prisma.$FeeMasterPayload<ExtArgs>
        fields: Prisma.FeeMasterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeeMasterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeeMasterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>
          }
          findFirst: {
            args: Prisma.FeeMasterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeeMasterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>
          }
          findMany: {
            args: Prisma.FeeMasterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>[]
          }
          create: {
            args: Prisma.FeeMasterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>
          }
          createMany: {
            args: Prisma.FeeMasterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeeMasterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>[]
          }
          delete: {
            args: Prisma.FeeMasterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>
          }
          update: {
            args: Prisma.FeeMasterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>
          }
          deleteMany: {
            args: Prisma.FeeMasterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeeMasterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeeMasterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeeMasterPayload>
          }
          aggregate: {
            args: Prisma.FeeMasterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeeMaster>
          }
          groupBy: {
            args: Prisma.FeeMasterGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeeMasterGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeeMasterCountArgs<ExtArgs>
            result: $Utils.Optional<FeeMasterCountAggregateOutputType> | number
          }
        }
      }
      SettlementHistory: {
        payload: Prisma.$SettlementHistoryPayload<ExtArgs>
        fields: Prisma.SettlementHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettlementHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettlementHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>
          }
          findFirst: {
            args: Prisma.SettlementHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettlementHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>
          }
          findMany: {
            args: Prisma.SettlementHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>[]
          }
          create: {
            args: Prisma.SettlementHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>
          }
          createMany: {
            args: Prisma.SettlementHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettlementHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>[]
          }
          delete: {
            args: Prisma.SettlementHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>
          }
          update: {
            args: Prisma.SettlementHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>
          }
          deleteMany: {
            args: Prisma.SettlementHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettlementHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettlementHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementHistoryPayload>
          }
          aggregate: {
            args: Prisma.SettlementHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettlementHistory>
          }
          groupBy: {
            args: Prisma.SettlementHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettlementHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettlementHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<SettlementHistoryCountAggregateOutputType> | number
          }
        }
      }
      Affiliation: {
        payload: Prisma.$AffiliationPayload<ExtArgs>
        fields: Prisma.AffiliationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>
          }
          findFirst: {
            args: Prisma.AffiliationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>
          }
          findMany: {
            args: Prisma.AffiliationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>[]
          }
          create: {
            args: Prisma.AffiliationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>
          }
          createMany: {
            args: Prisma.AffiliationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>[]
          }
          delete: {
            args: Prisma.AffiliationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>
          }
          update: {
            args: Prisma.AffiliationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>
          }
          deleteMany: {
            args: Prisma.AffiliationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AffiliationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliationPayload>
          }
          aggregate: {
            args: Prisma.AffiliationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliation>
          }
          groupBy: {
            args: Prisma.AffiliationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliationCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Driver
   */

  export type AggregateDriver = {
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  export type DriverAvgAggregateOutputType = {
    id: number | null
  }

  export type DriverSumAggregateOutputType = {
    id: number | null
  }

  export type DriverMinAggregateOutputType = {
    id: number | null
    name: string | null
    affiliation: string | null
    tonnage: string | null
    regDate: string | null
    address: string | null
    memo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverMaxAggregateOutputType = {
    id: number | null
    name: string | null
    affiliation: string | null
    tonnage: string | null
    regDate: string | null
    address: string | null
    memo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DriverCountAggregateOutputType = {
    id: number
    name: number
    affiliation: number
    tonnage: number
    regDate: number
    address: number
    memo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DriverAvgAggregateInputType = {
    id?: true
  }

  export type DriverSumAggregateInputType = {
    id?: true
  }

  export type DriverMinAggregateInputType = {
    id?: true
    name?: true
    affiliation?: true
    tonnage?: true
    regDate?: true
    address?: true
    memo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverMaxAggregateInputType = {
    id?: true
    name?: true
    affiliation?: true
    tonnage?: true
    regDate?: true
    address?: true
    memo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DriverCountAggregateInputType = {
    id?: true
    name?: true
    affiliation?: true
    tonnage?: true
    regDate?: true
    address?: true
    memo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DriverAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Driver to aggregate.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drivers
    **/
    _count?: true | DriverCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DriverAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DriverSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DriverMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DriverMaxAggregateInputType
  }

  export type GetDriverAggregateType<T extends DriverAggregateArgs> = {
        [P in keyof T & keyof AggregateDriver]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDriver[P]>
      : GetScalarType<T[P], AggregateDriver[P]>
  }




  export type DriverGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DriverWhereInput
    orderBy?: DriverOrderByWithAggregationInput | DriverOrderByWithAggregationInput[]
    by: DriverScalarFieldEnum[] | DriverScalarFieldEnum
    having?: DriverScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DriverCountAggregateInputType | true
    _avg?: DriverAvgAggregateInputType
    _sum?: DriverSumAggregateInputType
    _min?: DriverMinAggregateInputType
    _max?: DriverMaxAggregateInputType
  }

  export type DriverGroupByOutputType = {
    id: number
    name: string
    affiliation: string | null
    tonnage: string | null
    regDate: string | null
    address: string | null
    memo: string | null
    createdAt: Date
    updatedAt: Date
    _count: DriverCountAggregateOutputType | null
    _avg: DriverAvgAggregateOutputType | null
    _sum: DriverSumAggregateOutputType | null
    _min: DriverMinAggregateOutputType | null
    _max: DriverMaxAggregateOutputType | null
  }

  type GetDriverGroupByPayload<T extends DriverGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DriverGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DriverGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DriverGroupByOutputType[P]>
            : GetScalarType<T[P], DriverGroupByOutputType[P]>
        }
      >
    >


  export type DriverSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    affiliation?: boolean
    tonnage?: boolean
    regDate?: boolean
    address?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    affiliation?: boolean
    tonnage?: boolean
    regDate?: boolean
    address?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["driver"]>

  export type DriverSelectScalar = {
    id?: boolean
    name?: boolean
    affiliation?: boolean
    tonnage?: boolean
    regDate?: boolean
    address?: boolean
    memo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $DriverPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Driver"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      affiliation: string | null
      tonnage: string | null
      regDate: string | null
      address: string | null
      memo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["driver"]>
    composites: {}
  }

  type DriverGetPayload<S extends boolean | null | undefined | DriverDefaultArgs> = $Result.GetResult<Prisma.$DriverPayload, S>

  type DriverCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DriverFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DriverCountAggregateInputType | true
    }

  export interface DriverDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Driver'], meta: { name: 'Driver' } }
    /**
     * Find zero or one Driver that matches the filter.
     * @param {DriverFindUniqueArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DriverFindUniqueArgs>(args: SelectSubset<T, DriverFindUniqueArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Driver that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DriverFindUniqueOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DriverFindUniqueOrThrowArgs>(args: SelectSubset<T, DriverFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Driver that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DriverFindFirstArgs>(args?: SelectSubset<T, DriverFindFirstArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Driver that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindFirstOrThrowArgs} args - Arguments to find a Driver
     * @example
     * // Get one Driver
     * const driver = await prisma.driver.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DriverFindFirstOrThrowArgs>(args?: SelectSubset<T, DriverFindFirstOrThrowArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Drivers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drivers
     * const drivers = await prisma.driver.findMany()
     * 
     * // Get first 10 Drivers
     * const drivers = await prisma.driver.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const driverWithIdOnly = await prisma.driver.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DriverFindManyArgs>(args?: SelectSubset<T, DriverFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Driver.
     * @param {DriverCreateArgs} args - Arguments to create a Driver.
     * @example
     * // Create one Driver
     * const Driver = await prisma.driver.create({
     *   data: {
     *     // ... data to create a Driver
     *   }
     * })
     * 
     */
    create<T extends DriverCreateArgs>(args: SelectSubset<T, DriverCreateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Drivers.
     * @param {DriverCreateManyArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DriverCreateManyArgs>(args?: SelectSubset<T, DriverCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drivers and returns the data saved in the database.
     * @param {DriverCreateManyAndReturnArgs} args - Arguments to create many Drivers.
     * @example
     * // Create many Drivers
     * const driver = await prisma.driver.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drivers and only return the `id`
     * const driverWithIdOnly = await prisma.driver.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DriverCreateManyAndReturnArgs>(args?: SelectSubset<T, DriverCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Driver.
     * @param {DriverDeleteArgs} args - Arguments to delete one Driver.
     * @example
     * // Delete one Driver
     * const Driver = await prisma.driver.delete({
     *   where: {
     *     // ... filter to delete one Driver
     *   }
     * })
     * 
     */
    delete<T extends DriverDeleteArgs>(args: SelectSubset<T, DriverDeleteArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Driver.
     * @param {DriverUpdateArgs} args - Arguments to update one Driver.
     * @example
     * // Update one Driver
     * const driver = await prisma.driver.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DriverUpdateArgs>(args: SelectSubset<T, DriverUpdateArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Drivers.
     * @param {DriverDeleteManyArgs} args - Arguments to filter Drivers to delete.
     * @example
     * // Delete a few Drivers
     * const { count } = await prisma.driver.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DriverDeleteManyArgs>(args?: SelectSubset<T, DriverDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drivers
     * const driver = await prisma.driver.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DriverUpdateManyArgs>(args: SelectSubset<T, DriverUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Driver.
     * @param {DriverUpsertArgs} args - Arguments to update or create a Driver.
     * @example
     * // Update or create a Driver
     * const driver = await prisma.driver.upsert({
     *   create: {
     *     // ... data to create a Driver
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Driver we want to update
     *   }
     * })
     */
    upsert<T extends DriverUpsertArgs>(args: SelectSubset<T, DriverUpsertArgs<ExtArgs>>): Prisma__DriverClient<$Result.GetResult<Prisma.$DriverPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Drivers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverCountArgs} args - Arguments to filter Drivers to count.
     * @example
     * // Count the number of Drivers
     * const count = await prisma.driver.count({
     *   where: {
     *     // ... the filter for the Drivers we want to count
     *   }
     * })
    **/
    count<T extends DriverCountArgs>(
      args?: Subset<T, DriverCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DriverCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DriverAggregateArgs>(args: Subset<T, DriverAggregateArgs>): Prisma.PrismaPromise<GetDriverAggregateType<T>>

    /**
     * Group by Driver.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DriverGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DriverGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DriverGroupByArgs['orderBy'] }
        : { orderBy?: DriverGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DriverGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Driver model
   */
  readonly fields: DriverFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Driver.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DriverClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Driver model
   */ 
  interface DriverFieldRefs {
    readonly id: FieldRef<"Driver", 'Int'>
    readonly name: FieldRef<"Driver", 'String'>
    readonly affiliation: FieldRef<"Driver", 'String'>
    readonly tonnage: FieldRef<"Driver", 'String'>
    readonly regDate: FieldRef<"Driver", 'String'>
    readonly address: FieldRef<"Driver", 'String'>
    readonly memo: FieldRef<"Driver", 'String'>
    readonly createdAt: FieldRef<"Driver", 'DateTime'>
    readonly updatedAt: FieldRef<"Driver", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Driver findUnique
   */
  export type DriverFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findUniqueOrThrow
   */
  export type DriverFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver findFirst
   */
  export type DriverFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findFirstOrThrow
   */
  export type DriverFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Filter, which Driver to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drivers.
     */
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver findMany
   */
  export type DriverFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Filter, which Drivers to fetch.
     */
    where?: DriverWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drivers to fetch.
     */
    orderBy?: DriverOrderByWithRelationInput | DriverOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drivers.
     */
    cursor?: DriverWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drivers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drivers.
     */
    skip?: number
    distinct?: DriverScalarFieldEnum | DriverScalarFieldEnum[]
  }

  /**
   * Driver create
   */
  export type DriverCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * The data needed to create a Driver.
     */
    data: XOR<DriverCreateInput, DriverUncheckedCreateInput>
  }

  /**
   * Driver createMany
   */
  export type DriverCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver createManyAndReturn
   */
  export type DriverCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Drivers.
     */
    data: DriverCreateManyInput | DriverCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Driver update
   */
  export type DriverUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * The data needed to update a Driver.
     */
    data: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
    /**
     * Choose, which Driver to update.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver updateMany
   */
  export type DriverUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drivers.
     */
    data: XOR<DriverUpdateManyMutationInput, DriverUncheckedUpdateManyInput>
    /**
     * Filter which Drivers to update
     */
    where?: DriverWhereInput
  }

  /**
   * Driver upsert
   */
  export type DriverUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * The filter to search for the Driver to update in case it exists.
     */
    where: DriverWhereUniqueInput
    /**
     * In case the Driver found by the `where` argument doesn't exist, create a new Driver with this data.
     */
    create: XOR<DriverCreateInput, DriverUncheckedCreateInput>
    /**
     * In case the Driver was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DriverUpdateInput, DriverUncheckedUpdateInput>
  }

  /**
   * Driver delete
   */
  export type DriverDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
    /**
     * Filter which Driver to delete.
     */
    where: DriverWhereUniqueInput
  }

  /**
   * Driver deleteMany
   */
  export type DriverDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drivers to delete
     */
    where?: DriverWhereInput
  }

  /**
   * Driver without action
   */
  export type DriverDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Driver
     */
    select?: DriverSelect<ExtArgs> | null
  }


  /**
   * Model FeeMaster
   */

  export type AggregateFeeMaster = {
    _count: FeeMasterCountAggregateOutputType | null
    _avg: FeeMasterAvgAggregateOutputType | null
    _sum: FeeMasterSumAggregateOutputType | null
    _min: FeeMasterMinAggregateOutputType | null
    _max: FeeMasterMaxAggregateOutputType | null
  }

  export type FeeMasterAvgAggregateOutputType = {
    id: number | null
    year: number | null
    fee: number | null
  }

  export type FeeMasterSumAggregateOutputType = {
    id: number | null
    year: number | null
    fee: number | null
  }

  export type FeeMasterMinAggregateOutputType = {
    id: number | null
    affiliation: string | null
    tonnage: string | null
    year: number | null
    region: string | null
    fee: number | null
    memo: string | null
    isActive: boolean | null
    readonly: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeeMasterMaxAggregateOutputType = {
    id: number | null
    affiliation: string | null
    tonnage: string | null
    year: number | null
    region: string | null
    fee: number | null
    memo: string | null
    isActive: boolean | null
    readonly: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeeMasterCountAggregateOutputType = {
    id: number
    affiliation: number
    tonnage: number
    year: number
    region: number
    fee: number
    memo: number
    isActive: number
    readonly: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeeMasterAvgAggregateInputType = {
    id?: true
    year?: true
    fee?: true
  }

  export type FeeMasterSumAggregateInputType = {
    id?: true
    year?: true
    fee?: true
  }

  export type FeeMasterMinAggregateInputType = {
    id?: true
    affiliation?: true
    tonnage?: true
    year?: true
    region?: true
    fee?: true
    memo?: true
    isActive?: true
    readonly?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeeMasterMaxAggregateInputType = {
    id?: true
    affiliation?: true
    tonnage?: true
    year?: true
    region?: true
    fee?: true
    memo?: true
    isActive?: true
    readonly?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeeMasterCountAggregateInputType = {
    id?: true
    affiliation?: true
    tonnage?: true
    year?: true
    region?: true
    fee?: true
    memo?: true
    isActive?: true
    readonly?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeeMasterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeeMaster to aggregate.
     */
    where?: FeeMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeeMasters to fetch.
     */
    orderBy?: FeeMasterOrderByWithRelationInput | FeeMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeeMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeeMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeeMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeeMasters
    **/
    _count?: true | FeeMasterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeeMasterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeeMasterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeeMasterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeeMasterMaxAggregateInputType
  }

  export type GetFeeMasterAggregateType<T extends FeeMasterAggregateArgs> = {
        [P in keyof T & keyof AggregateFeeMaster]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeeMaster[P]>
      : GetScalarType<T[P], AggregateFeeMaster[P]>
  }




  export type FeeMasterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeeMasterWhereInput
    orderBy?: FeeMasterOrderByWithAggregationInput | FeeMasterOrderByWithAggregationInput[]
    by: FeeMasterScalarFieldEnum[] | FeeMasterScalarFieldEnum
    having?: FeeMasterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeeMasterCountAggregateInputType | true
    _avg?: FeeMasterAvgAggregateInputType
    _sum?: FeeMasterSumAggregateInputType
    _min?: FeeMasterMinAggregateInputType
    _max?: FeeMasterMaxAggregateInputType
  }

  export type FeeMasterGroupByOutputType = {
    id: number
    affiliation: string
    tonnage: string
    year: number
    region: string
    fee: number
    memo: string | null
    isActive: boolean
    readonly: boolean
    createdAt: Date
    updatedAt: Date
    _count: FeeMasterCountAggregateOutputType | null
    _avg: FeeMasterAvgAggregateOutputType | null
    _sum: FeeMasterSumAggregateOutputType | null
    _min: FeeMasterMinAggregateOutputType | null
    _max: FeeMasterMaxAggregateOutputType | null
  }

  type GetFeeMasterGroupByPayload<T extends FeeMasterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeeMasterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeeMasterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeeMasterGroupByOutputType[P]>
            : GetScalarType<T[P], FeeMasterGroupByOutputType[P]>
        }
      >
    >


  export type FeeMasterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    affiliation?: boolean
    tonnage?: boolean
    year?: boolean
    region?: boolean
    fee?: boolean
    memo?: boolean
    isActive?: boolean
    readonly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feeMaster"]>

  export type FeeMasterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    affiliation?: boolean
    tonnage?: boolean
    year?: boolean
    region?: boolean
    fee?: boolean
    memo?: boolean
    isActive?: boolean
    readonly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["feeMaster"]>

  export type FeeMasterSelectScalar = {
    id?: boolean
    affiliation?: boolean
    tonnage?: boolean
    year?: boolean
    region?: boolean
    fee?: boolean
    memo?: boolean
    isActive?: boolean
    readonly?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $FeeMasterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeeMaster"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      affiliation: string
      tonnage: string
      year: number
      region: string
      fee: number
      memo: string | null
      isActive: boolean
      readonly: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["feeMaster"]>
    composites: {}
  }

  type FeeMasterGetPayload<S extends boolean | null | undefined | FeeMasterDefaultArgs> = $Result.GetResult<Prisma.$FeeMasterPayload, S>

  type FeeMasterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeeMasterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeeMasterCountAggregateInputType | true
    }

  export interface FeeMasterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeeMaster'], meta: { name: 'FeeMaster' } }
    /**
     * Find zero or one FeeMaster that matches the filter.
     * @param {FeeMasterFindUniqueArgs} args - Arguments to find a FeeMaster
     * @example
     * // Get one FeeMaster
     * const feeMaster = await prisma.feeMaster.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeeMasterFindUniqueArgs>(args: SelectSubset<T, FeeMasterFindUniqueArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FeeMaster that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeeMasterFindUniqueOrThrowArgs} args - Arguments to find a FeeMaster
     * @example
     * // Get one FeeMaster
     * const feeMaster = await prisma.feeMaster.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeeMasterFindUniqueOrThrowArgs>(args: SelectSubset<T, FeeMasterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FeeMaster that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterFindFirstArgs} args - Arguments to find a FeeMaster
     * @example
     * // Get one FeeMaster
     * const feeMaster = await prisma.feeMaster.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeeMasterFindFirstArgs>(args?: SelectSubset<T, FeeMasterFindFirstArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FeeMaster that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterFindFirstOrThrowArgs} args - Arguments to find a FeeMaster
     * @example
     * // Get one FeeMaster
     * const feeMaster = await prisma.feeMaster.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeeMasterFindFirstOrThrowArgs>(args?: SelectSubset<T, FeeMasterFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FeeMasters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeeMasters
     * const feeMasters = await prisma.feeMaster.findMany()
     * 
     * // Get first 10 FeeMasters
     * const feeMasters = await prisma.feeMaster.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feeMasterWithIdOnly = await prisma.feeMaster.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeeMasterFindManyArgs>(args?: SelectSubset<T, FeeMasterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FeeMaster.
     * @param {FeeMasterCreateArgs} args - Arguments to create a FeeMaster.
     * @example
     * // Create one FeeMaster
     * const FeeMaster = await prisma.feeMaster.create({
     *   data: {
     *     // ... data to create a FeeMaster
     *   }
     * })
     * 
     */
    create<T extends FeeMasterCreateArgs>(args: SelectSubset<T, FeeMasterCreateArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FeeMasters.
     * @param {FeeMasterCreateManyArgs} args - Arguments to create many FeeMasters.
     * @example
     * // Create many FeeMasters
     * const feeMaster = await prisma.feeMaster.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeeMasterCreateManyArgs>(args?: SelectSubset<T, FeeMasterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeeMasters and returns the data saved in the database.
     * @param {FeeMasterCreateManyAndReturnArgs} args - Arguments to create many FeeMasters.
     * @example
     * // Create many FeeMasters
     * const feeMaster = await prisma.feeMaster.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeeMasters and only return the `id`
     * const feeMasterWithIdOnly = await prisma.feeMaster.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeeMasterCreateManyAndReturnArgs>(args?: SelectSubset<T, FeeMasterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FeeMaster.
     * @param {FeeMasterDeleteArgs} args - Arguments to delete one FeeMaster.
     * @example
     * // Delete one FeeMaster
     * const FeeMaster = await prisma.feeMaster.delete({
     *   where: {
     *     // ... filter to delete one FeeMaster
     *   }
     * })
     * 
     */
    delete<T extends FeeMasterDeleteArgs>(args: SelectSubset<T, FeeMasterDeleteArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FeeMaster.
     * @param {FeeMasterUpdateArgs} args - Arguments to update one FeeMaster.
     * @example
     * // Update one FeeMaster
     * const feeMaster = await prisma.feeMaster.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeeMasterUpdateArgs>(args: SelectSubset<T, FeeMasterUpdateArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FeeMasters.
     * @param {FeeMasterDeleteManyArgs} args - Arguments to filter FeeMasters to delete.
     * @example
     * // Delete a few FeeMasters
     * const { count } = await prisma.feeMaster.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeeMasterDeleteManyArgs>(args?: SelectSubset<T, FeeMasterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeeMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeeMasters
     * const feeMaster = await prisma.feeMaster.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeeMasterUpdateManyArgs>(args: SelectSubset<T, FeeMasterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FeeMaster.
     * @param {FeeMasterUpsertArgs} args - Arguments to update or create a FeeMaster.
     * @example
     * // Update or create a FeeMaster
     * const feeMaster = await prisma.feeMaster.upsert({
     *   create: {
     *     // ... data to create a FeeMaster
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeeMaster we want to update
     *   }
     * })
     */
    upsert<T extends FeeMasterUpsertArgs>(args: SelectSubset<T, FeeMasterUpsertArgs<ExtArgs>>): Prisma__FeeMasterClient<$Result.GetResult<Prisma.$FeeMasterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FeeMasters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterCountArgs} args - Arguments to filter FeeMasters to count.
     * @example
     * // Count the number of FeeMasters
     * const count = await prisma.feeMaster.count({
     *   where: {
     *     // ... the filter for the FeeMasters we want to count
     *   }
     * })
    **/
    count<T extends FeeMasterCountArgs>(
      args?: Subset<T, FeeMasterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeeMasterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeeMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeeMasterAggregateArgs>(args: Subset<T, FeeMasterAggregateArgs>): Prisma.PrismaPromise<GetFeeMasterAggregateType<T>>

    /**
     * Group by FeeMaster.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeeMasterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeeMasterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeeMasterGroupByArgs['orderBy'] }
        : { orderBy?: FeeMasterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeeMasterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeeMasterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeeMaster model
   */
  readonly fields: FeeMasterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeeMaster.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeeMasterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeeMaster model
   */ 
  interface FeeMasterFieldRefs {
    readonly id: FieldRef<"FeeMaster", 'Int'>
    readonly affiliation: FieldRef<"FeeMaster", 'String'>
    readonly tonnage: FieldRef<"FeeMaster", 'String'>
    readonly year: FieldRef<"FeeMaster", 'Int'>
    readonly region: FieldRef<"FeeMaster", 'String'>
    readonly fee: FieldRef<"FeeMaster", 'Int'>
    readonly memo: FieldRef<"FeeMaster", 'String'>
    readonly isActive: FieldRef<"FeeMaster", 'Boolean'>
    readonly readonly: FieldRef<"FeeMaster", 'Boolean'>
    readonly createdAt: FieldRef<"FeeMaster", 'DateTime'>
    readonly updatedAt: FieldRef<"FeeMaster", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeeMaster findUnique
   */
  export type FeeMasterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * Filter, which FeeMaster to fetch.
     */
    where: FeeMasterWhereUniqueInput
  }

  /**
   * FeeMaster findUniqueOrThrow
   */
  export type FeeMasterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * Filter, which FeeMaster to fetch.
     */
    where: FeeMasterWhereUniqueInput
  }

  /**
   * FeeMaster findFirst
   */
  export type FeeMasterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * Filter, which FeeMaster to fetch.
     */
    where?: FeeMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeeMasters to fetch.
     */
    orderBy?: FeeMasterOrderByWithRelationInput | FeeMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeeMasters.
     */
    cursor?: FeeMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeeMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeeMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeeMasters.
     */
    distinct?: FeeMasterScalarFieldEnum | FeeMasterScalarFieldEnum[]
  }

  /**
   * FeeMaster findFirstOrThrow
   */
  export type FeeMasterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * Filter, which FeeMaster to fetch.
     */
    where?: FeeMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeeMasters to fetch.
     */
    orderBy?: FeeMasterOrderByWithRelationInput | FeeMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeeMasters.
     */
    cursor?: FeeMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeeMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeeMasters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeeMasters.
     */
    distinct?: FeeMasterScalarFieldEnum | FeeMasterScalarFieldEnum[]
  }

  /**
   * FeeMaster findMany
   */
  export type FeeMasterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * Filter, which FeeMasters to fetch.
     */
    where?: FeeMasterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeeMasters to fetch.
     */
    orderBy?: FeeMasterOrderByWithRelationInput | FeeMasterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeeMasters.
     */
    cursor?: FeeMasterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeeMasters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeeMasters.
     */
    skip?: number
    distinct?: FeeMasterScalarFieldEnum | FeeMasterScalarFieldEnum[]
  }

  /**
   * FeeMaster create
   */
  export type FeeMasterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * The data needed to create a FeeMaster.
     */
    data: XOR<FeeMasterCreateInput, FeeMasterUncheckedCreateInput>
  }

  /**
   * FeeMaster createMany
   */
  export type FeeMasterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeeMasters.
     */
    data: FeeMasterCreateManyInput | FeeMasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeeMaster createManyAndReturn
   */
  export type FeeMasterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FeeMasters.
     */
    data: FeeMasterCreateManyInput | FeeMasterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeeMaster update
   */
  export type FeeMasterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * The data needed to update a FeeMaster.
     */
    data: XOR<FeeMasterUpdateInput, FeeMasterUncheckedUpdateInput>
    /**
     * Choose, which FeeMaster to update.
     */
    where: FeeMasterWhereUniqueInput
  }

  /**
   * FeeMaster updateMany
   */
  export type FeeMasterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeeMasters.
     */
    data: XOR<FeeMasterUpdateManyMutationInput, FeeMasterUncheckedUpdateManyInput>
    /**
     * Filter which FeeMasters to update
     */
    where?: FeeMasterWhereInput
  }

  /**
   * FeeMaster upsert
   */
  export type FeeMasterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * The filter to search for the FeeMaster to update in case it exists.
     */
    where: FeeMasterWhereUniqueInput
    /**
     * In case the FeeMaster found by the `where` argument doesn't exist, create a new FeeMaster with this data.
     */
    create: XOR<FeeMasterCreateInput, FeeMasterUncheckedCreateInput>
    /**
     * In case the FeeMaster was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeeMasterUpdateInput, FeeMasterUncheckedUpdateInput>
  }

  /**
   * FeeMaster delete
   */
  export type FeeMasterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
    /**
     * Filter which FeeMaster to delete.
     */
    where: FeeMasterWhereUniqueInput
  }

  /**
   * FeeMaster deleteMany
   */
  export type FeeMasterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeeMasters to delete
     */
    where?: FeeMasterWhereInput
  }

  /**
   * FeeMaster without action
   */
  export type FeeMasterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeeMaster
     */
    select?: FeeMasterSelect<ExtArgs> | null
  }


  /**
   * Model SettlementHistory
   */

  export type AggregateSettlementHistory = {
    _count: SettlementHistoryCountAggregateOutputType | null
    _avg: SettlementHistoryAvgAggregateOutputType | null
    _sum: SettlementHistorySumAggregateOutputType | null
    _min: SettlementHistoryMinAggregateOutputType | null
    _max: SettlementHistoryMaxAggregateOutputType | null
  }

  export type SettlementHistoryAvgAggregateOutputType = {
    id: number | null
    destCount: number | null
    totalWeight: number | null
    fee: number | null
    ton: number | null
  }

  export type SettlementHistorySumAggregateOutputType = {
    id: number | null
    destCount: number | null
    totalWeight: number | null
    fee: number | null
    ton: number | null
  }

  export type SettlementHistoryMinAggregateOutputType = {
    id: number | null
    date: string | null
    driverName: string | null
    affiliation: string | null
    tonnage: string | null
    destCount: number | null
    totalWeight: number | null
    fee: number | null
    memo: string | null
    isPbox: boolean | null
    isReturn: boolean | null
    so: string | null
    nap: string | null
    ton: number | null
    createdAt: Date | null
  }

  export type SettlementHistoryMaxAggregateOutputType = {
    id: number | null
    date: string | null
    driverName: string | null
    affiliation: string | null
    tonnage: string | null
    destCount: number | null
    totalWeight: number | null
    fee: number | null
    memo: string | null
    isPbox: boolean | null
    isReturn: boolean | null
    so: string | null
    nap: string | null
    ton: number | null
    createdAt: Date | null
  }

  export type SettlementHistoryCountAggregateOutputType = {
    id: number
    date: number
    driverName: number
    affiliation: number
    tonnage: number
    destCount: number
    totalWeight: number
    fee: number
    memo: number
    isPbox: number
    isReturn: number
    so: number
    nap: number
    ton: number
    createdAt: number
    _all: number
  }


  export type SettlementHistoryAvgAggregateInputType = {
    id?: true
    destCount?: true
    totalWeight?: true
    fee?: true
    ton?: true
  }

  export type SettlementHistorySumAggregateInputType = {
    id?: true
    destCount?: true
    totalWeight?: true
    fee?: true
    ton?: true
  }

  export type SettlementHistoryMinAggregateInputType = {
    id?: true
    date?: true
    driverName?: true
    affiliation?: true
    tonnage?: true
    destCount?: true
    totalWeight?: true
    fee?: true
    memo?: true
    isPbox?: true
    isReturn?: true
    so?: true
    nap?: true
    ton?: true
    createdAt?: true
  }

  export type SettlementHistoryMaxAggregateInputType = {
    id?: true
    date?: true
    driverName?: true
    affiliation?: true
    tonnage?: true
    destCount?: true
    totalWeight?: true
    fee?: true
    memo?: true
    isPbox?: true
    isReturn?: true
    so?: true
    nap?: true
    ton?: true
    createdAt?: true
  }

  export type SettlementHistoryCountAggregateInputType = {
    id?: true
    date?: true
    driverName?: true
    affiliation?: true
    tonnage?: true
    destCount?: true
    totalWeight?: true
    fee?: true
    memo?: true
    isPbox?: true
    isReturn?: true
    so?: true
    nap?: true
    ton?: true
    createdAt?: true
    _all?: true
  }

  export type SettlementHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SettlementHistory to aggregate.
     */
    where?: SettlementHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementHistories to fetch.
     */
    orderBy?: SettlementHistoryOrderByWithRelationInput | SettlementHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettlementHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SettlementHistories
    **/
    _count?: true | SettlementHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettlementHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettlementHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettlementHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettlementHistoryMaxAggregateInputType
  }

  export type GetSettlementHistoryAggregateType<T extends SettlementHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateSettlementHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettlementHistory[P]>
      : GetScalarType<T[P], AggregateSettlementHistory[P]>
  }




  export type SettlementHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettlementHistoryWhereInput
    orderBy?: SettlementHistoryOrderByWithAggregationInput | SettlementHistoryOrderByWithAggregationInput[]
    by: SettlementHistoryScalarFieldEnum[] | SettlementHistoryScalarFieldEnum
    having?: SettlementHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettlementHistoryCountAggregateInputType | true
    _avg?: SettlementHistoryAvgAggregateInputType
    _sum?: SettlementHistorySumAggregateInputType
    _min?: SettlementHistoryMinAggregateInputType
    _max?: SettlementHistoryMaxAggregateInputType
  }

  export type SettlementHistoryGroupByOutputType = {
    id: number
    date: string
    driverName: string
    affiliation: string | null
    tonnage: string | null
    destCount: number
    totalWeight: number
    fee: number
    memo: string | null
    isPbox: boolean
    isReturn: boolean
    so: string | null
    nap: string | null
    ton: number | null
    createdAt: Date
    _count: SettlementHistoryCountAggregateOutputType | null
    _avg: SettlementHistoryAvgAggregateOutputType | null
    _sum: SettlementHistorySumAggregateOutputType | null
    _min: SettlementHistoryMinAggregateOutputType | null
    _max: SettlementHistoryMaxAggregateOutputType | null
  }

  type GetSettlementHistoryGroupByPayload<T extends SettlementHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettlementHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettlementHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettlementHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], SettlementHistoryGroupByOutputType[P]>
        }
      >
    >


  export type SettlementHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    driverName?: boolean
    affiliation?: boolean
    tonnage?: boolean
    destCount?: boolean
    totalWeight?: boolean
    fee?: boolean
    memo?: boolean
    isPbox?: boolean
    isReturn?: boolean
    so?: boolean
    nap?: boolean
    ton?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["settlementHistory"]>

  export type SettlementHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    driverName?: boolean
    affiliation?: boolean
    tonnage?: boolean
    destCount?: boolean
    totalWeight?: boolean
    fee?: boolean
    memo?: boolean
    isPbox?: boolean
    isReturn?: boolean
    so?: boolean
    nap?: boolean
    ton?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["settlementHistory"]>

  export type SettlementHistorySelectScalar = {
    id?: boolean
    date?: boolean
    driverName?: boolean
    affiliation?: boolean
    tonnage?: boolean
    destCount?: boolean
    totalWeight?: boolean
    fee?: boolean
    memo?: boolean
    isPbox?: boolean
    isReturn?: boolean
    so?: boolean
    nap?: boolean
    ton?: boolean
    createdAt?: boolean
  }


  export type $SettlementHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SettlementHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: string
      driverName: string
      affiliation: string | null
      tonnage: string | null
      destCount: number
      totalWeight: number
      fee: number
      memo: string | null
      isPbox: boolean
      isReturn: boolean
      so: string | null
      nap: string | null
      ton: number | null
      createdAt: Date
    }, ExtArgs["result"]["settlementHistory"]>
    composites: {}
  }

  type SettlementHistoryGetPayload<S extends boolean | null | undefined | SettlementHistoryDefaultArgs> = $Result.GetResult<Prisma.$SettlementHistoryPayload, S>

  type SettlementHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettlementHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettlementHistoryCountAggregateInputType | true
    }

  export interface SettlementHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SettlementHistory'], meta: { name: 'SettlementHistory' } }
    /**
     * Find zero or one SettlementHistory that matches the filter.
     * @param {SettlementHistoryFindUniqueArgs} args - Arguments to find a SettlementHistory
     * @example
     * // Get one SettlementHistory
     * const settlementHistory = await prisma.settlementHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettlementHistoryFindUniqueArgs>(args: SelectSubset<T, SettlementHistoryFindUniqueArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SettlementHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettlementHistoryFindUniqueOrThrowArgs} args - Arguments to find a SettlementHistory
     * @example
     * // Get one SettlementHistory
     * const settlementHistory = await prisma.settlementHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettlementHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, SettlementHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SettlementHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryFindFirstArgs} args - Arguments to find a SettlementHistory
     * @example
     * // Get one SettlementHistory
     * const settlementHistory = await prisma.settlementHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettlementHistoryFindFirstArgs>(args?: SelectSubset<T, SettlementHistoryFindFirstArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SettlementHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryFindFirstOrThrowArgs} args - Arguments to find a SettlementHistory
     * @example
     * // Get one SettlementHistory
     * const settlementHistory = await prisma.settlementHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettlementHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, SettlementHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SettlementHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SettlementHistories
     * const settlementHistories = await prisma.settlementHistory.findMany()
     * 
     * // Get first 10 SettlementHistories
     * const settlementHistories = await prisma.settlementHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settlementHistoryWithIdOnly = await prisma.settlementHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettlementHistoryFindManyArgs>(args?: SelectSubset<T, SettlementHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SettlementHistory.
     * @param {SettlementHistoryCreateArgs} args - Arguments to create a SettlementHistory.
     * @example
     * // Create one SettlementHistory
     * const SettlementHistory = await prisma.settlementHistory.create({
     *   data: {
     *     // ... data to create a SettlementHistory
     *   }
     * })
     * 
     */
    create<T extends SettlementHistoryCreateArgs>(args: SelectSubset<T, SettlementHistoryCreateArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SettlementHistories.
     * @param {SettlementHistoryCreateManyArgs} args - Arguments to create many SettlementHistories.
     * @example
     * // Create many SettlementHistories
     * const settlementHistory = await prisma.settlementHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettlementHistoryCreateManyArgs>(args?: SelectSubset<T, SettlementHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SettlementHistories and returns the data saved in the database.
     * @param {SettlementHistoryCreateManyAndReturnArgs} args - Arguments to create many SettlementHistories.
     * @example
     * // Create many SettlementHistories
     * const settlementHistory = await prisma.settlementHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SettlementHistories and only return the `id`
     * const settlementHistoryWithIdOnly = await prisma.settlementHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettlementHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, SettlementHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SettlementHistory.
     * @param {SettlementHistoryDeleteArgs} args - Arguments to delete one SettlementHistory.
     * @example
     * // Delete one SettlementHistory
     * const SettlementHistory = await prisma.settlementHistory.delete({
     *   where: {
     *     // ... filter to delete one SettlementHistory
     *   }
     * })
     * 
     */
    delete<T extends SettlementHistoryDeleteArgs>(args: SelectSubset<T, SettlementHistoryDeleteArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SettlementHistory.
     * @param {SettlementHistoryUpdateArgs} args - Arguments to update one SettlementHistory.
     * @example
     * // Update one SettlementHistory
     * const settlementHistory = await prisma.settlementHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettlementHistoryUpdateArgs>(args: SelectSubset<T, SettlementHistoryUpdateArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SettlementHistories.
     * @param {SettlementHistoryDeleteManyArgs} args - Arguments to filter SettlementHistories to delete.
     * @example
     * // Delete a few SettlementHistories
     * const { count } = await prisma.settlementHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettlementHistoryDeleteManyArgs>(args?: SelectSubset<T, SettlementHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SettlementHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SettlementHistories
     * const settlementHistory = await prisma.settlementHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettlementHistoryUpdateManyArgs>(args: SelectSubset<T, SettlementHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SettlementHistory.
     * @param {SettlementHistoryUpsertArgs} args - Arguments to update or create a SettlementHistory.
     * @example
     * // Update or create a SettlementHistory
     * const settlementHistory = await prisma.settlementHistory.upsert({
     *   create: {
     *     // ... data to create a SettlementHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SettlementHistory we want to update
     *   }
     * })
     */
    upsert<T extends SettlementHistoryUpsertArgs>(args: SelectSubset<T, SettlementHistoryUpsertArgs<ExtArgs>>): Prisma__SettlementHistoryClient<$Result.GetResult<Prisma.$SettlementHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SettlementHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryCountArgs} args - Arguments to filter SettlementHistories to count.
     * @example
     * // Count the number of SettlementHistories
     * const count = await prisma.settlementHistory.count({
     *   where: {
     *     // ... the filter for the SettlementHistories we want to count
     *   }
     * })
    **/
    count<T extends SettlementHistoryCountArgs>(
      args?: Subset<T, SettlementHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettlementHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SettlementHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettlementHistoryAggregateArgs>(args: Subset<T, SettlementHistoryAggregateArgs>): Prisma.PrismaPromise<GetSettlementHistoryAggregateType<T>>

    /**
     * Group by SettlementHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettlementHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettlementHistoryGroupByArgs['orderBy'] }
        : { orderBy?: SettlementHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettlementHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettlementHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SettlementHistory model
   */
  readonly fields: SettlementHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SettlementHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettlementHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SettlementHistory model
   */ 
  interface SettlementHistoryFieldRefs {
    readonly id: FieldRef<"SettlementHistory", 'Int'>
    readonly date: FieldRef<"SettlementHistory", 'String'>
    readonly driverName: FieldRef<"SettlementHistory", 'String'>
    readonly affiliation: FieldRef<"SettlementHistory", 'String'>
    readonly tonnage: FieldRef<"SettlementHistory", 'String'>
    readonly destCount: FieldRef<"SettlementHistory", 'Int'>
    readonly totalWeight: FieldRef<"SettlementHistory", 'Int'>
    readonly fee: FieldRef<"SettlementHistory", 'Int'>
    readonly memo: FieldRef<"SettlementHistory", 'String'>
    readonly isPbox: FieldRef<"SettlementHistory", 'Boolean'>
    readonly isReturn: FieldRef<"SettlementHistory", 'Boolean'>
    readonly so: FieldRef<"SettlementHistory", 'String'>
    readonly nap: FieldRef<"SettlementHistory", 'String'>
    readonly ton: FieldRef<"SettlementHistory", 'Int'>
    readonly createdAt: FieldRef<"SettlementHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SettlementHistory findUnique
   */
  export type SettlementHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * Filter, which SettlementHistory to fetch.
     */
    where: SettlementHistoryWhereUniqueInput
  }

  /**
   * SettlementHistory findUniqueOrThrow
   */
  export type SettlementHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * Filter, which SettlementHistory to fetch.
     */
    where: SettlementHistoryWhereUniqueInput
  }

  /**
   * SettlementHistory findFirst
   */
  export type SettlementHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * Filter, which SettlementHistory to fetch.
     */
    where?: SettlementHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementHistories to fetch.
     */
    orderBy?: SettlementHistoryOrderByWithRelationInput | SettlementHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SettlementHistories.
     */
    cursor?: SettlementHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SettlementHistories.
     */
    distinct?: SettlementHistoryScalarFieldEnum | SettlementHistoryScalarFieldEnum[]
  }

  /**
   * SettlementHistory findFirstOrThrow
   */
  export type SettlementHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * Filter, which SettlementHistory to fetch.
     */
    where?: SettlementHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementHistories to fetch.
     */
    orderBy?: SettlementHistoryOrderByWithRelationInput | SettlementHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SettlementHistories.
     */
    cursor?: SettlementHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SettlementHistories.
     */
    distinct?: SettlementHistoryScalarFieldEnum | SettlementHistoryScalarFieldEnum[]
  }

  /**
   * SettlementHistory findMany
   */
  export type SettlementHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * Filter, which SettlementHistories to fetch.
     */
    where?: SettlementHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementHistories to fetch.
     */
    orderBy?: SettlementHistoryOrderByWithRelationInput | SettlementHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SettlementHistories.
     */
    cursor?: SettlementHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementHistories.
     */
    skip?: number
    distinct?: SettlementHistoryScalarFieldEnum | SettlementHistoryScalarFieldEnum[]
  }

  /**
   * SettlementHistory create
   */
  export type SettlementHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * The data needed to create a SettlementHistory.
     */
    data: XOR<SettlementHistoryCreateInput, SettlementHistoryUncheckedCreateInput>
  }

  /**
   * SettlementHistory createMany
   */
  export type SettlementHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SettlementHistories.
     */
    data: SettlementHistoryCreateManyInput | SettlementHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SettlementHistory createManyAndReturn
   */
  export type SettlementHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SettlementHistories.
     */
    data: SettlementHistoryCreateManyInput | SettlementHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SettlementHistory update
   */
  export type SettlementHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * The data needed to update a SettlementHistory.
     */
    data: XOR<SettlementHistoryUpdateInput, SettlementHistoryUncheckedUpdateInput>
    /**
     * Choose, which SettlementHistory to update.
     */
    where: SettlementHistoryWhereUniqueInput
  }

  /**
   * SettlementHistory updateMany
   */
  export type SettlementHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SettlementHistories.
     */
    data: XOR<SettlementHistoryUpdateManyMutationInput, SettlementHistoryUncheckedUpdateManyInput>
    /**
     * Filter which SettlementHistories to update
     */
    where?: SettlementHistoryWhereInput
  }

  /**
   * SettlementHistory upsert
   */
  export type SettlementHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * The filter to search for the SettlementHistory to update in case it exists.
     */
    where: SettlementHistoryWhereUniqueInput
    /**
     * In case the SettlementHistory found by the `where` argument doesn't exist, create a new SettlementHistory with this data.
     */
    create: XOR<SettlementHistoryCreateInput, SettlementHistoryUncheckedCreateInput>
    /**
     * In case the SettlementHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettlementHistoryUpdateInput, SettlementHistoryUncheckedUpdateInput>
  }

  /**
   * SettlementHistory delete
   */
  export type SettlementHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
    /**
     * Filter which SettlementHistory to delete.
     */
    where: SettlementHistoryWhereUniqueInput
  }

  /**
   * SettlementHistory deleteMany
   */
  export type SettlementHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SettlementHistories to delete
     */
    where?: SettlementHistoryWhereInput
  }

  /**
   * SettlementHistory without action
   */
  export type SettlementHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementHistory
     */
    select?: SettlementHistorySelect<ExtArgs> | null
  }


  /**
   * Model Affiliation
   */

  export type AggregateAffiliation = {
    _count: AffiliationCountAggregateOutputType | null
    _avg: AffiliationAvgAggregateOutputType | null
    _sum: AffiliationSumAggregateOutputType | null
    _min: AffiliationMinAggregateOutputType | null
    _max: AffiliationMaxAggregateOutputType | null
  }

  export type AffiliationAvgAggregateOutputType = {
    id: number | null
  }

  export type AffiliationSumAggregateOutputType = {
    id: number | null
  }

  export type AffiliationMinAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
  }

  export type AffiliationMaxAggregateOutputType = {
    id: number | null
    name: string | null
    createdAt: Date | null
  }

  export type AffiliationCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type AffiliationAvgAggregateInputType = {
    id?: true
  }

  export type AffiliationSumAggregateInputType = {
    id?: true
  }

  export type AffiliationMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type AffiliationMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type AffiliationCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type AffiliationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affiliation to aggregate.
     */
    where?: AffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliations to fetch.
     */
    orderBy?: AffiliationOrderByWithRelationInput | AffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Affiliations
    **/
    _count?: true | AffiliationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliationMaxAggregateInputType
  }

  export type GetAffiliationAggregateType<T extends AffiliationAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliation[P]>
      : GetScalarType<T[P], AggregateAffiliation[P]>
  }




  export type AffiliationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliationWhereInput
    orderBy?: AffiliationOrderByWithAggregationInput | AffiliationOrderByWithAggregationInput[]
    by: AffiliationScalarFieldEnum[] | AffiliationScalarFieldEnum
    having?: AffiliationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliationCountAggregateInputType | true
    _avg?: AffiliationAvgAggregateInputType
    _sum?: AffiliationSumAggregateInputType
    _min?: AffiliationMinAggregateInputType
    _max?: AffiliationMaxAggregateInputType
  }

  export type AffiliationGroupByOutputType = {
    id: number
    name: string
    createdAt: Date
    _count: AffiliationCountAggregateOutputType | null
    _avg: AffiliationAvgAggregateOutputType | null
    _sum: AffiliationSumAggregateOutputType | null
    _min: AffiliationMinAggregateOutputType | null
    _max: AffiliationMaxAggregateOutputType | null
  }

  type GetAffiliationGroupByPayload<T extends AffiliationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliationGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliationGroupByOutputType[P]>
        }
      >
    >


  export type AffiliationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["affiliation"]>

  export type AffiliationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["affiliation"]>

  export type AffiliationSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }


  export type $AffiliationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Affiliation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      createdAt: Date
    }, ExtArgs["result"]["affiliation"]>
    composites: {}
  }

  type AffiliationGetPayload<S extends boolean | null | undefined | AffiliationDefaultArgs> = $Result.GetResult<Prisma.$AffiliationPayload, S>

  type AffiliationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AffiliationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AffiliationCountAggregateInputType | true
    }

  export interface AffiliationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Affiliation'], meta: { name: 'Affiliation' } }
    /**
     * Find zero or one Affiliation that matches the filter.
     * @param {AffiliationFindUniqueArgs} args - Arguments to find a Affiliation
     * @example
     * // Get one Affiliation
     * const affiliation = await prisma.affiliation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliationFindUniqueArgs>(args: SelectSubset<T, AffiliationFindUniqueArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Affiliation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AffiliationFindUniqueOrThrowArgs} args - Arguments to find a Affiliation
     * @example
     * // Get one Affiliation
     * const affiliation = await prisma.affiliation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliationFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Affiliation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationFindFirstArgs} args - Arguments to find a Affiliation
     * @example
     * // Get one Affiliation
     * const affiliation = await prisma.affiliation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliationFindFirstArgs>(args?: SelectSubset<T, AffiliationFindFirstArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Affiliation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationFindFirstOrThrowArgs} args - Arguments to find a Affiliation
     * @example
     * // Get one Affiliation
     * const affiliation = await prisma.affiliation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliationFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Affiliations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Affiliations
     * const affiliations = await prisma.affiliation.findMany()
     * 
     * // Get first 10 Affiliations
     * const affiliations = await prisma.affiliation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliationWithIdOnly = await prisma.affiliation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliationFindManyArgs>(args?: SelectSubset<T, AffiliationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Affiliation.
     * @param {AffiliationCreateArgs} args - Arguments to create a Affiliation.
     * @example
     * // Create one Affiliation
     * const Affiliation = await prisma.affiliation.create({
     *   data: {
     *     // ... data to create a Affiliation
     *   }
     * })
     * 
     */
    create<T extends AffiliationCreateArgs>(args: SelectSubset<T, AffiliationCreateArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Affiliations.
     * @param {AffiliationCreateManyArgs} args - Arguments to create many Affiliations.
     * @example
     * // Create many Affiliations
     * const affiliation = await prisma.affiliation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliationCreateManyArgs>(args?: SelectSubset<T, AffiliationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Affiliations and returns the data saved in the database.
     * @param {AffiliationCreateManyAndReturnArgs} args - Arguments to create many Affiliations.
     * @example
     * // Create many Affiliations
     * const affiliation = await prisma.affiliation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Affiliations and only return the `id`
     * const affiliationWithIdOnly = await prisma.affiliation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliationCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Affiliation.
     * @param {AffiliationDeleteArgs} args - Arguments to delete one Affiliation.
     * @example
     * // Delete one Affiliation
     * const Affiliation = await prisma.affiliation.delete({
     *   where: {
     *     // ... filter to delete one Affiliation
     *   }
     * })
     * 
     */
    delete<T extends AffiliationDeleteArgs>(args: SelectSubset<T, AffiliationDeleteArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Affiliation.
     * @param {AffiliationUpdateArgs} args - Arguments to update one Affiliation.
     * @example
     * // Update one Affiliation
     * const affiliation = await prisma.affiliation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliationUpdateArgs>(args: SelectSubset<T, AffiliationUpdateArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Affiliations.
     * @param {AffiliationDeleteManyArgs} args - Arguments to filter Affiliations to delete.
     * @example
     * // Delete a few Affiliations
     * const { count } = await prisma.affiliation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliationDeleteManyArgs>(args?: SelectSubset<T, AffiliationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Affiliations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Affiliations
     * const affiliation = await prisma.affiliation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliationUpdateManyArgs>(args: SelectSubset<T, AffiliationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Affiliation.
     * @param {AffiliationUpsertArgs} args - Arguments to update or create a Affiliation.
     * @example
     * // Update or create a Affiliation
     * const affiliation = await prisma.affiliation.upsert({
     *   create: {
     *     // ... data to create a Affiliation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Affiliation we want to update
     *   }
     * })
     */
    upsert<T extends AffiliationUpsertArgs>(args: SelectSubset<T, AffiliationUpsertArgs<ExtArgs>>): Prisma__AffiliationClient<$Result.GetResult<Prisma.$AffiliationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Affiliations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationCountArgs} args - Arguments to filter Affiliations to count.
     * @example
     * // Count the number of Affiliations
     * const count = await prisma.affiliation.count({
     *   where: {
     *     // ... the filter for the Affiliations we want to count
     *   }
     * })
    **/
    count<T extends AffiliationCountArgs>(
      args?: Subset<T, AffiliationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Affiliation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliationAggregateArgs>(args: Subset<T, AffiliationAggregateArgs>): Prisma.PrismaPromise<GetAffiliationAggregateType<T>>

    /**
     * Group by Affiliation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliationGroupByArgs['orderBy'] }
        : { orderBy?: AffiliationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Affiliation model
   */
  readonly fields: AffiliationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Affiliation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Affiliation model
   */ 
  interface AffiliationFieldRefs {
    readonly id: FieldRef<"Affiliation", 'Int'>
    readonly name: FieldRef<"Affiliation", 'String'>
    readonly createdAt: FieldRef<"Affiliation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Affiliation findUnique
   */
  export type AffiliationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * Filter, which Affiliation to fetch.
     */
    where: AffiliationWhereUniqueInput
  }

  /**
   * Affiliation findUniqueOrThrow
   */
  export type AffiliationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * Filter, which Affiliation to fetch.
     */
    where: AffiliationWhereUniqueInput
  }

  /**
   * Affiliation findFirst
   */
  export type AffiliationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * Filter, which Affiliation to fetch.
     */
    where?: AffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliations to fetch.
     */
    orderBy?: AffiliationOrderByWithRelationInput | AffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affiliations.
     */
    cursor?: AffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affiliations.
     */
    distinct?: AffiliationScalarFieldEnum | AffiliationScalarFieldEnum[]
  }

  /**
   * Affiliation findFirstOrThrow
   */
  export type AffiliationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * Filter, which Affiliation to fetch.
     */
    where?: AffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliations to fetch.
     */
    orderBy?: AffiliationOrderByWithRelationInput | AffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Affiliations.
     */
    cursor?: AffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Affiliations.
     */
    distinct?: AffiliationScalarFieldEnum | AffiliationScalarFieldEnum[]
  }

  /**
   * Affiliation findMany
   */
  export type AffiliationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * Filter, which Affiliations to fetch.
     */
    where?: AffiliationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Affiliations to fetch.
     */
    orderBy?: AffiliationOrderByWithRelationInput | AffiliationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Affiliations.
     */
    cursor?: AffiliationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Affiliations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Affiliations.
     */
    skip?: number
    distinct?: AffiliationScalarFieldEnum | AffiliationScalarFieldEnum[]
  }

  /**
   * Affiliation create
   */
  export type AffiliationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * The data needed to create a Affiliation.
     */
    data: XOR<AffiliationCreateInput, AffiliationUncheckedCreateInput>
  }

  /**
   * Affiliation createMany
   */
  export type AffiliationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Affiliations.
     */
    data: AffiliationCreateManyInput | AffiliationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Affiliation createManyAndReturn
   */
  export type AffiliationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Affiliations.
     */
    data: AffiliationCreateManyInput | AffiliationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Affiliation update
   */
  export type AffiliationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * The data needed to update a Affiliation.
     */
    data: XOR<AffiliationUpdateInput, AffiliationUncheckedUpdateInput>
    /**
     * Choose, which Affiliation to update.
     */
    where: AffiliationWhereUniqueInput
  }

  /**
   * Affiliation updateMany
   */
  export type AffiliationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Affiliations.
     */
    data: XOR<AffiliationUpdateManyMutationInput, AffiliationUncheckedUpdateManyInput>
    /**
     * Filter which Affiliations to update
     */
    where?: AffiliationWhereInput
  }

  /**
   * Affiliation upsert
   */
  export type AffiliationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * The filter to search for the Affiliation to update in case it exists.
     */
    where: AffiliationWhereUniqueInput
    /**
     * In case the Affiliation found by the `where` argument doesn't exist, create a new Affiliation with this data.
     */
    create: XOR<AffiliationCreateInput, AffiliationUncheckedCreateInput>
    /**
     * In case the Affiliation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliationUpdateInput, AffiliationUncheckedUpdateInput>
  }

  /**
   * Affiliation delete
   */
  export type AffiliationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
    /**
     * Filter which Affiliation to delete.
     */
    where: AffiliationWhereUniqueInput
  }

  /**
   * Affiliation deleteMany
   */
  export type AffiliationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Affiliations to delete
     */
    where?: AffiliationWhereInput
  }

  /**
   * Affiliation without action
   */
  export type AffiliationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Affiliation
     */
    select?: AffiliationSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DriverScalarFieldEnum: {
    id: 'id',
    name: 'name',
    affiliation: 'affiliation',
    tonnage: 'tonnage',
    regDate: 'regDate',
    address: 'address',
    memo: 'memo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DriverScalarFieldEnum = (typeof DriverScalarFieldEnum)[keyof typeof DriverScalarFieldEnum]


  export const FeeMasterScalarFieldEnum: {
    id: 'id',
    affiliation: 'affiliation',
    tonnage: 'tonnage',
    year: 'year',
    region: 'region',
    fee: 'fee',
    memo: 'memo',
    isActive: 'isActive',
    readonly: 'readonly',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeeMasterScalarFieldEnum = (typeof FeeMasterScalarFieldEnum)[keyof typeof FeeMasterScalarFieldEnum]


  export const SettlementHistoryScalarFieldEnum: {
    id: 'id',
    date: 'date',
    driverName: 'driverName',
    affiliation: 'affiliation',
    tonnage: 'tonnage',
    destCount: 'destCount',
    totalWeight: 'totalWeight',
    fee: 'fee',
    memo: 'memo',
    isPbox: 'isPbox',
    isReturn: 'isReturn',
    so: 'so',
    nap: 'nap',
    ton: 'ton',
    createdAt: 'createdAt'
  };

  export type SettlementHistoryScalarFieldEnum = (typeof SettlementHistoryScalarFieldEnum)[keyof typeof SettlementHistoryScalarFieldEnum]


  export const AffiliationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type AffiliationScalarFieldEnum = (typeof AffiliationScalarFieldEnum)[keyof typeof AffiliationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DriverWhereInput = {
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    id?: IntFilter<"Driver"> | number
    name?: StringFilter<"Driver"> | string
    affiliation?: StringNullableFilter<"Driver"> | string | null
    tonnage?: StringNullableFilter<"Driver"> | string | null
    regDate?: StringNullableFilter<"Driver"> | string | null
    address?: StringNullableFilter<"Driver"> | string | null
    memo?: StringNullableFilter<"Driver"> | string | null
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
  }

  export type DriverOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    tonnage?: SortOrderInput | SortOrder
    regDate?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DriverWhereInput | DriverWhereInput[]
    OR?: DriverWhereInput[]
    NOT?: DriverWhereInput | DriverWhereInput[]
    name?: StringFilter<"Driver"> | string
    affiliation?: StringNullableFilter<"Driver"> | string | null
    tonnage?: StringNullableFilter<"Driver"> | string | null
    regDate?: StringNullableFilter<"Driver"> | string | null
    address?: StringNullableFilter<"Driver"> | string | null
    memo?: StringNullableFilter<"Driver"> | string | null
    createdAt?: DateTimeFilter<"Driver"> | Date | string
    updatedAt?: DateTimeFilter<"Driver"> | Date | string
  }, "id">

  export type DriverOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    tonnage?: SortOrderInput | SortOrder
    regDate?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DriverCountOrderByAggregateInput
    _avg?: DriverAvgOrderByAggregateInput
    _max?: DriverMaxOrderByAggregateInput
    _min?: DriverMinOrderByAggregateInput
    _sum?: DriverSumOrderByAggregateInput
  }

  export type DriverScalarWhereWithAggregatesInput = {
    AND?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    OR?: DriverScalarWhereWithAggregatesInput[]
    NOT?: DriverScalarWhereWithAggregatesInput | DriverScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Driver"> | number
    name?: StringWithAggregatesFilter<"Driver"> | string
    affiliation?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    tonnage?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    regDate?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    address?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    memo?: StringNullableWithAggregatesFilter<"Driver"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Driver"> | Date | string
  }

  export type FeeMasterWhereInput = {
    AND?: FeeMasterWhereInput | FeeMasterWhereInput[]
    OR?: FeeMasterWhereInput[]
    NOT?: FeeMasterWhereInput | FeeMasterWhereInput[]
    id?: IntFilter<"FeeMaster"> | number
    affiliation?: StringFilter<"FeeMaster"> | string
    tonnage?: StringFilter<"FeeMaster"> | string
    year?: IntFilter<"FeeMaster"> | number
    region?: StringFilter<"FeeMaster"> | string
    fee?: IntFilter<"FeeMaster"> | number
    memo?: StringNullableFilter<"FeeMaster"> | string | null
    isActive?: BoolFilter<"FeeMaster"> | boolean
    readonly?: BoolFilter<"FeeMaster"> | boolean
    createdAt?: DateTimeFilter<"FeeMaster"> | Date | string
    updatedAt?: DateTimeFilter<"FeeMaster"> | Date | string
  }

  export type FeeMasterOrderByWithRelationInput = {
    id?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    year?: SortOrder
    region?: SortOrder
    fee?: SortOrder
    memo?: SortOrderInput | SortOrder
    isActive?: SortOrder
    readonly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeMasterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FeeMasterWhereInput | FeeMasterWhereInput[]
    OR?: FeeMasterWhereInput[]
    NOT?: FeeMasterWhereInput | FeeMasterWhereInput[]
    affiliation?: StringFilter<"FeeMaster"> | string
    tonnage?: StringFilter<"FeeMaster"> | string
    year?: IntFilter<"FeeMaster"> | number
    region?: StringFilter<"FeeMaster"> | string
    fee?: IntFilter<"FeeMaster"> | number
    memo?: StringNullableFilter<"FeeMaster"> | string | null
    isActive?: BoolFilter<"FeeMaster"> | boolean
    readonly?: BoolFilter<"FeeMaster"> | boolean
    createdAt?: DateTimeFilter<"FeeMaster"> | Date | string
    updatedAt?: DateTimeFilter<"FeeMaster"> | Date | string
  }, "id">

  export type FeeMasterOrderByWithAggregationInput = {
    id?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    year?: SortOrder
    region?: SortOrder
    fee?: SortOrder
    memo?: SortOrderInput | SortOrder
    isActive?: SortOrder
    readonly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeeMasterCountOrderByAggregateInput
    _avg?: FeeMasterAvgOrderByAggregateInput
    _max?: FeeMasterMaxOrderByAggregateInput
    _min?: FeeMasterMinOrderByAggregateInput
    _sum?: FeeMasterSumOrderByAggregateInput
  }

  export type FeeMasterScalarWhereWithAggregatesInput = {
    AND?: FeeMasterScalarWhereWithAggregatesInput | FeeMasterScalarWhereWithAggregatesInput[]
    OR?: FeeMasterScalarWhereWithAggregatesInput[]
    NOT?: FeeMasterScalarWhereWithAggregatesInput | FeeMasterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FeeMaster"> | number
    affiliation?: StringWithAggregatesFilter<"FeeMaster"> | string
    tonnage?: StringWithAggregatesFilter<"FeeMaster"> | string
    year?: IntWithAggregatesFilter<"FeeMaster"> | number
    region?: StringWithAggregatesFilter<"FeeMaster"> | string
    fee?: IntWithAggregatesFilter<"FeeMaster"> | number
    memo?: StringNullableWithAggregatesFilter<"FeeMaster"> | string | null
    isActive?: BoolWithAggregatesFilter<"FeeMaster"> | boolean
    readonly?: BoolWithAggregatesFilter<"FeeMaster"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FeeMaster"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeeMaster"> | Date | string
  }

  export type SettlementHistoryWhereInput = {
    AND?: SettlementHistoryWhereInput | SettlementHistoryWhereInput[]
    OR?: SettlementHistoryWhereInput[]
    NOT?: SettlementHistoryWhereInput | SettlementHistoryWhereInput[]
    id?: IntFilter<"SettlementHistory"> | number
    date?: StringFilter<"SettlementHistory"> | string
    driverName?: StringFilter<"SettlementHistory"> | string
    affiliation?: StringNullableFilter<"SettlementHistory"> | string | null
    tonnage?: StringNullableFilter<"SettlementHistory"> | string | null
    destCount?: IntFilter<"SettlementHistory"> | number
    totalWeight?: IntFilter<"SettlementHistory"> | number
    fee?: IntFilter<"SettlementHistory"> | number
    memo?: StringNullableFilter<"SettlementHistory"> | string | null
    isPbox?: BoolFilter<"SettlementHistory"> | boolean
    isReturn?: BoolFilter<"SettlementHistory"> | boolean
    so?: StringNullableFilter<"SettlementHistory"> | string | null
    nap?: StringNullableFilter<"SettlementHistory"> | string | null
    ton?: IntNullableFilter<"SettlementHistory"> | number | null
    createdAt?: DateTimeFilter<"SettlementHistory"> | Date | string
  }

  export type SettlementHistoryOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    driverName?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    tonnage?: SortOrderInput | SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    memo?: SortOrderInput | SortOrder
    isPbox?: SortOrder
    isReturn?: SortOrder
    so?: SortOrderInput | SortOrder
    nap?: SortOrderInput | SortOrder
    ton?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SettlementHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SettlementHistoryWhereInput | SettlementHistoryWhereInput[]
    OR?: SettlementHistoryWhereInput[]
    NOT?: SettlementHistoryWhereInput | SettlementHistoryWhereInput[]
    date?: StringFilter<"SettlementHistory"> | string
    driverName?: StringFilter<"SettlementHistory"> | string
    affiliation?: StringNullableFilter<"SettlementHistory"> | string | null
    tonnage?: StringNullableFilter<"SettlementHistory"> | string | null
    destCount?: IntFilter<"SettlementHistory"> | number
    totalWeight?: IntFilter<"SettlementHistory"> | number
    fee?: IntFilter<"SettlementHistory"> | number
    memo?: StringNullableFilter<"SettlementHistory"> | string | null
    isPbox?: BoolFilter<"SettlementHistory"> | boolean
    isReturn?: BoolFilter<"SettlementHistory"> | boolean
    so?: StringNullableFilter<"SettlementHistory"> | string | null
    nap?: StringNullableFilter<"SettlementHistory"> | string | null
    ton?: IntNullableFilter<"SettlementHistory"> | number | null
    createdAt?: DateTimeFilter<"SettlementHistory"> | Date | string
  }, "id">

  export type SettlementHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    driverName?: SortOrder
    affiliation?: SortOrderInput | SortOrder
    tonnage?: SortOrderInput | SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    memo?: SortOrderInput | SortOrder
    isPbox?: SortOrder
    isReturn?: SortOrder
    so?: SortOrderInput | SortOrder
    nap?: SortOrderInput | SortOrder
    ton?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SettlementHistoryCountOrderByAggregateInput
    _avg?: SettlementHistoryAvgOrderByAggregateInput
    _max?: SettlementHistoryMaxOrderByAggregateInput
    _min?: SettlementHistoryMinOrderByAggregateInput
    _sum?: SettlementHistorySumOrderByAggregateInput
  }

  export type SettlementHistoryScalarWhereWithAggregatesInput = {
    AND?: SettlementHistoryScalarWhereWithAggregatesInput | SettlementHistoryScalarWhereWithAggregatesInput[]
    OR?: SettlementHistoryScalarWhereWithAggregatesInput[]
    NOT?: SettlementHistoryScalarWhereWithAggregatesInput | SettlementHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SettlementHistory"> | number
    date?: StringWithAggregatesFilter<"SettlementHistory"> | string
    driverName?: StringWithAggregatesFilter<"SettlementHistory"> | string
    affiliation?: StringNullableWithAggregatesFilter<"SettlementHistory"> | string | null
    tonnage?: StringNullableWithAggregatesFilter<"SettlementHistory"> | string | null
    destCount?: IntWithAggregatesFilter<"SettlementHistory"> | number
    totalWeight?: IntWithAggregatesFilter<"SettlementHistory"> | number
    fee?: IntWithAggregatesFilter<"SettlementHistory"> | number
    memo?: StringNullableWithAggregatesFilter<"SettlementHistory"> | string | null
    isPbox?: BoolWithAggregatesFilter<"SettlementHistory"> | boolean
    isReturn?: BoolWithAggregatesFilter<"SettlementHistory"> | boolean
    so?: StringNullableWithAggregatesFilter<"SettlementHistory"> | string | null
    nap?: StringNullableWithAggregatesFilter<"SettlementHistory"> | string | null
    ton?: IntNullableWithAggregatesFilter<"SettlementHistory"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SettlementHistory"> | Date | string
  }

  export type AffiliationWhereInput = {
    AND?: AffiliationWhereInput | AffiliationWhereInput[]
    OR?: AffiliationWhereInput[]
    NOT?: AffiliationWhereInput | AffiliationWhereInput[]
    id?: IntFilter<"Affiliation"> | number
    name?: StringFilter<"Affiliation"> | string
    createdAt?: DateTimeFilter<"Affiliation"> | Date | string
  }

  export type AffiliationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: AffiliationWhereInput | AffiliationWhereInput[]
    OR?: AffiliationWhereInput[]
    NOT?: AffiliationWhereInput | AffiliationWhereInput[]
    createdAt?: DateTimeFilter<"Affiliation"> | Date | string
  }, "id" | "name">

  export type AffiliationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: AffiliationCountOrderByAggregateInput
    _avg?: AffiliationAvgOrderByAggregateInput
    _max?: AffiliationMaxOrderByAggregateInput
    _min?: AffiliationMinOrderByAggregateInput
    _sum?: AffiliationSumOrderByAggregateInput
  }

  export type AffiliationScalarWhereWithAggregatesInput = {
    AND?: AffiliationScalarWhereWithAggregatesInput | AffiliationScalarWhereWithAggregatesInput[]
    OR?: AffiliationScalarWhereWithAggregatesInput[]
    NOT?: AffiliationScalarWhereWithAggregatesInput | AffiliationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Affiliation"> | number
    name?: StringWithAggregatesFilter<"Affiliation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Affiliation"> | Date | string
  }

  export type DriverCreateInput = {
    name: string
    affiliation?: string | null
    tonnage?: string | null
    regDate?: string | null
    address?: string | null
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUncheckedCreateInput = {
    id?: number
    name: string
    affiliation?: string | null
    tonnage?: string | null
    regDate?: string | null
    address?: string | null
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    regDate?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    regDate?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverCreateManyInput = {
    id?: number
    name: string
    affiliation?: string | null
    tonnage?: string | null
    regDate?: string | null
    address?: string | null
    memo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DriverUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    regDate?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DriverUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    regDate?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeMasterCreateInput = {
    affiliation: string
    tonnage: string
    year: number
    region: string
    fee: number
    memo?: string | null
    isActive?: boolean
    readonly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeeMasterUncheckedCreateInput = {
    id?: number
    affiliation: string
    tonnage: string
    year: number
    region: string
    fee: number
    memo?: string | null
    isActive?: boolean
    readonly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeeMasterUpdateInput = {
    affiliation?: StringFieldUpdateOperationsInput | string
    tonnage?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    readonly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeMasterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    affiliation?: StringFieldUpdateOperationsInput | string
    tonnage?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    readonly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeMasterCreateManyInput = {
    id?: number
    affiliation: string
    tonnage: string
    year: number
    region: string
    fee: number
    memo?: string | null
    isActive?: boolean
    readonly?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeeMasterUpdateManyMutationInput = {
    affiliation?: StringFieldUpdateOperationsInput | string
    tonnage?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    readonly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeeMasterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    affiliation?: StringFieldUpdateOperationsInput | string
    tonnage?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    readonly?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementHistoryCreateInput = {
    date: string
    driverName: string
    affiliation?: string | null
    tonnage?: string | null
    destCount: number
    totalWeight: number
    fee: number
    memo?: string | null
    isPbox?: boolean
    isReturn?: boolean
    so?: string | null
    nap?: string | null
    ton?: number | null
    createdAt?: Date | string
  }

  export type SettlementHistoryUncheckedCreateInput = {
    id?: number
    date: string
    driverName: string
    affiliation?: string | null
    tonnage?: string | null
    destCount: number
    totalWeight: number
    fee: number
    memo?: string | null
    isPbox?: boolean
    isReturn?: boolean
    so?: string | null
    nap?: string | null
    ton?: number | null
    createdAt?: Date | string
  }

  export type SettlementHistoryUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    destCount?: IntFieldUpdateOperationsInput | number
    totalWeight?: IntFieldUpdateOperationsInput | number
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isPbox?: BoolFieldUpdateOperationsInput | boolean
    isReturn?: BoolFieldUpdateOperationsInput | boolean
    so?: NullableStringFieldUpdateOperationsInput | string | null
    nap?: NullableStringFieldUpdateOperationsInput | string | null
    ton?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    destCount?: IntFieldUpdateOperationsInput | number
    totalWeight?: IntFieldUpdateOperationsInput | number
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isPbox?: BoolFieldUpdateOperationsInput | boolean
    isReturn?: BoolFieldUpdateOperationsInput | boolean
    so?: NullableStringFieldUpdateOperationsInput | string | null
    nap?: NullableStringFieldUpdateOperationsInput | string | null
    ton?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementHistoryCreateManyInput = {
    id?: number
    date: string
    driverName: string
    affiliation?: string | null
    tonnage?: string | null
    destCount: number
    totalWeight: number
    fee: number
    memo?: string | null
    isPbox?: boolean
    isReturn?: boolean
    so?: string | null
    nap?: string | null
    ton?: number | null
    createdAt?: Date | string
  }

  export type SettlementHistoryUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    destCount?: IntFieldUpdateOperationsInput | number
    totalWeight?: IntFieldUpdateOperationsInput | number
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isPbox?: BoolFieldUpdateOperationsInput | boolean
    isReturn?: BoolFieldUpdateOperationsInput | boolean
    so?: NullableStringFieldUpdateOperationsInput | string | null
    nap?: NullableStringFieldUpdateOperationsInput | string | null
    ton?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    affiliation?: NullableStringFieldUpdateOperationsInput | string | null
    tonnage?: NullableStringFieldUpdateOperationsInput | string | null
    destCount?: IntFieldUpdateOperationsInput | number
    totalWeight?: IntFieldUpdateOperationsInput | number
    fee?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    isPbox?: BoolFieldUpdateOperationsInput | boolean
    isReturn?: BoolFieldUpdateOperationsInput | boolean
    so?: NullableStringFieldUpdateOperationsInput | string | null
    nap?: NullableStringFieldUpdateOperationsInput | string | null
    ton?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliationCreateInput = {
    name: string
    createdAt?: Date | string
  }

  export type AffiliationUncheckedCreateInput = {
    id?: number
    name: string
    createdAt?: Date | string
  }

  export type AffiliationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliationCreateManyInput = {
    id?: number
    name: string
    createdAt?: Date | string
  }

  export type AffiliationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DriverCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    regDate?: SortOrder
    address?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DriverMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    regDate?: SortOrder
    address?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    regDate?: SortOrder
    address?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DriverSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FeeMasterCountOrderByAggregateInput = {
    id?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    year?: SortOrder
    region?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    isActive?: SortOrder
    readonly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeMasterAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    fee?: SortOrder
  }

  export type FeeMasterMaxOrderByAggregateInput = {
    id?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    year?: SortOrder
    region?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    isActive?: SortOrder
    readonly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeMasterMinOrderByAggregateInput = {
    id?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    year?: SortOrder
    region?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    isActive?: SortOrder
    readonly?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeeMasterSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    fee?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SettlementHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    driverName?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    isPbox?: SortOrder
    isReturn?: SortOrder
    so?: SortOrder
    nap?: SortOrder
    ton?: SortOrder
    createdAt?: SortOrder
  }

  export type SettlementHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    ton?: SortOrder
  }

  export type SettlementHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    driverName?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    isPbox?: SortOrder
    isReturn?: SortOrder
    so?: SortOrder
    nap?: SortOrder
    ton?: SortOrder
    createdAt?: SortOrder
  }

  export type SettlementHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    driverName?: SortOrder
    affiliation?: SortOrder
    tonnage?: SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    memo?: SortOrder
    isPbox?: SortOrder
    isReturn?: SortOrder
    so?: SortOrder
    nap?: SortOrder
    ton?: SortOrder
    createdAt?: SortOrder
  }

  export type SettlementHistorySumOrderByAggregateInput = {
    id?: SortOrder
    destCount?: SortOrder
    totalWeight?: SortOrder
    fee?: SortOrder
    ton?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AffiliationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AffiliationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type AffiliationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DriverDefaultArgs instead
     */
    export type DriverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DriverDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeeMasterDefaultArgs instead
     */
    export type FeeMasterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeeMasterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettlementHistoryDefaultArgs instead
     */
    export type SettlementHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettlementHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AffiliationDefaultArgs instead
     */
    export type AffiliationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AffiliationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
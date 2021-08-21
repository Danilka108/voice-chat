function bind<T extends Function>(
  _: any,
  name: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  return {
    get(this: T): T {
      const binded = descriptor.value!.bind(this)

      Object.defineProperty(this, name, {
        value: binded,
      })

      return binded
    },
  }
}

export function BindMethod() {
  return bind
}

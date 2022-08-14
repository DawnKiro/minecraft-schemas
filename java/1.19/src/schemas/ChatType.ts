import {
  StringNode as RawStringNode,
  ListNode,
  Mod,
  ObjectNode,
  Reference as RawReference,
  SchemaRegistry,
  CollectionRegistry,
  Opt,
} from '@mcschema/core'

export function initChatTypeSchemas(schemas: SchemaRegistry, collections: CollectionRegistry) {
  const Reference = RawReference.bind(undefined, schemas)
  const StringNode = RawStringNode.bind(undefined, collections)

  schemas.register('chat_type', Mod(ObjectNode({
    chat: Opt(Reference('text_decoration')),
    narration: Opt(Reference('text_decoration')),
  }, { context: 'chat_type' }), {
    default: () => ({
      chat: {
        parameters: ['sender', 'content'],
        translation_key: 'chat.type.text',
      }
    })
  }))

  schemas.register('text_decoration', Mod(ObjectNode({
    translation_key: StringNode(),
    parameters: ListNode(
      StringNode({ enum: ['sender', 'target', 'content'] })
    ),
    style: Opt(Reference('text_style'))
  }, { context: 'text_decoration' }), {
    default: () => ({
      translation_key: 'chat.type.text',
      parameters: ['sender', 'content'],
      style: {},
    })
  }))
}

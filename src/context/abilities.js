import { AbilityBuilder } from '@casl/ability'

export const defineAbilitiesFor = user => {
  const { can, rules } = AbilityBuilder.extract()

  if (user?.isAdmin) {
    can('manage', 'all')
  }

  return rules
}

import { NewAccountForm } from '@/components/account/NewAccountForm'
import { Layout } from '@/components/Layout'
import { Box, Grid } from 'theme-ui'

export default function ManageAccount() {
  return (
    <>
      <Layout sideNavLinks={null}>
        <Grid
          sx={{
            gap: 4,
            gridTemplateColumns: [
              '1fr',
              '1fr 1fr',
              '1fr 1fr 1fr',
              '1fr 1fr 1fr 1fr',
            ],
          }}
        >
          <Box sx={{ gridColumn: '1 / -1' }}>
            <NewAccountForm />
          </Box>
        </Grid>
      </Layout>
    </>
  )
}

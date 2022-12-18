import { Query, Resolver, Arg, Authorized } from 'type-graphql'
import { RecordLog } from '@entity/recordLog'
import { getRepository } from 'typeorm'

@Resolver((of) => RecordLog)
export class RecordLogQuery {
  repo = getRepository(RecordLog)

  @Authorized('admin')
  @Query((returns) => RecordLog, { description: '依Action取得' })
  logs(@Arg('action') action?: string): Promise<RecordLog[]> {
    if (!action) return this.repo.find()
    return this.repo.find({ where: { action } })
  }
}

// Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi6LGs5ra1IiwicGljdHVyZSI6Imh0dHBzOi8vdHNob3AucjEwcy5jb20vODFkL2ZlZC8wZWRlL2I0YTQvNjA4OS9hOGIwL2IyODQvMTEyNmViOWQ2NzAyNDJhYzExMDAwMy5qcGc_X2V4PTQ4Nng0ODYiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vam0tZXhwZW5zZS0yMDIyIiwiYXVkIjoiam0tZXhwZW5zZS0yMDIyIiwiYXV0aF90aW1lIjoxNjcxMzI5MTYyLCJ1c2VyX2lkIjoia0Jhb1FnZEdPN2dhbWlvaFdYYzRmb3EwSE5iMiIsInN1YiI6ImtCYW9RZ2RHTzdnYW1pb2hXWGM0Zm9xMEhOYjIiLCJpYXQiOjE2NzEzMjkxNjIsImV4cCI6MTY3MTMzMjc2MiwiZW1haWwiOiJzdXBlcjAwMDk5OTg4OEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic3VwZXIwMDA5OTk4ODhAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.sSEAJVEvzkEvHSfrK6oewkXR0lu2JiECfjm1y-E21na_T0-fHl4cruXHgXcpCzTDCVQqa70NCC5q0dyh1_Vl3FooAZdG2-9IL-OhwaJvzB9kwPa_Q1gQrEEsswIGFNxighB6846TdajJGqHDD3h3sCk-ScTxgxD83XdjUXWArTWRbg4ww9ITdZuVTW_B2sH2CoQMQoj_e2vnAIFXVeVlTo1RvdHGlqaXuVi-H80UohODriTmg98jorW0O1HX1cK8nQ93zx4KrYEFhXHPVx833G5AdfyaG865LFOwzAM3dfzDqOGErhSjQLxWanAQJdyEvAFonDHcSi_nVFRjQY_dtA

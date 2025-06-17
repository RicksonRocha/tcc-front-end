import { useSnackbar } from "notistack"
import { useGetTeamsCountQuery } from "src/api/team"
import {  useDeleteUserMutation, useGetUsersCountByRoleQuery, useGetUsersQuery } from "src/api/user"

export const useDashboardModel = () => {
    const { data: teamsCount } = useGetTeamsCountQuery()
    const { data: usersCount } = useGetUsersCountByRoleQuery()
    const { data: dataUsers , refetch, isLoading} = useGetUsersQuery()

    const {enqueueSnackbar} = useSnackbar()

    const [deleteUser] = useDeleteUserMutation()

    const handleEdit = (user) => {
        console.log("Editar usuário:", user);
        // abrir modal ou redirecionar
      };
    
    const handleDelete = async (id) => {
          // eslint-disable-next-line no-restricted-globals
        const response = confirm('Essa ação irá deletar o usuário')
        
        if (response) {
            await deleteUser(id)
            refetch()
            enqueueSnackbar('Usuário deletado com sucesso', {variant: 'success'})
        }
        
      };

    return {teamsCount, usersCount, dataUsers, handleDelete, handleEdit, isLoading}
}
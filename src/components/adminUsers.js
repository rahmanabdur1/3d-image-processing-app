import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/action";
import { Box, Button, Card, CardContent, Grid, Select, MenuItem, Typography } from "@mui/material";

const AdminUsers = async () => {
    const users = await getUsers();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Users</Typography>
            <Grid container spacing={2}>
                {users.map((user) => (
                    <Grid item xs={12} sm={6} md={4} key={user.id}>
                        <Card>
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                  
                                    <Box marginBottom={2}>
                                        <Typography variant="h9">{user.email}</Typography>
                                    </Box>
                                </Box>
                                <form action={deleteUser} >
                                    <input  type="hidden" name="id" value={user.id} />
                                    <Select  name="isAdmin" defaultValue="false" fullWidth>
                                        <MenuItem value="false">User</MenuItem>
                                        <MenuItem value="editor">Editor</MenuItem>
                                        <MenuItem value="true">Admin</MenuItem>
                                    </Select>
                                    <Button type="submit" variant="contained" color="error" sx={{ marginTop: 1 }}>
                                        Delete
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminUsers;

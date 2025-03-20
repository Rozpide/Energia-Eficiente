"""empty message

Revision ID: 47e4313ba251
Revises: cbab7e419875
Create Date: 2025-03-20 10:02:43.052774

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47e4313ba251'
down_revision = 'cbab7e419875'
branch_labels = None
depends_on = None


def upgrade():
    # Añadir columna password permitiendo valores NULL inicialmente
    with op.batch_alter_table('proveedor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.String(length=100), nullable=True))

    # Asignar un valor predeterminado para las filas existentes
    op.execute("UPDATE proveedor SET password = 'contraseña_temporal'")

    # Modificar la columna para aplicar la restricción NOT NULL después de asignar valores
    with op.batch_alter_table('proveedor', schema=None) as batch_op:
        batch_op.alter_column('password', nullable=False)

def downgrade():
    # Eliminar la columna password en caso de revertir
    with op.batch_alter_table('proveedor', schema=None) as batch_op:
        batch_op.drop_column('password')


    # ### end Alembic commands ###

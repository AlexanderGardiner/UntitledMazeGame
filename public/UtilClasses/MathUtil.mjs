export default class MathUtil {
    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static dotProduct(matrix1, matrix2) {
     
    }
    static multiply(m1, m2, mat1, n1, n2, mat2) {
        let result = [[],[],[]];
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                result[i][j] = 0;
                for (let k = 0; k < N; k++)
                    res[i][j] += mat1[i][k] * mat2[k][j];
            }
        }
    }
}